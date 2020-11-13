using AngularDotNetCoreStarterApp.Dto;
using AngularDotNetCoreStarterApp.Exceptions;
using AngularDotNetCoreStarterApp.Repository;
using AngularDotNetCoreStarterApp.Service.Interface;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace AngularDotNetCoreStarterApp.Service.Implementation
{
    public class AuthenticationService : IAuthenticationService
    {
        private IUserRepository _userRepository;
        private IPasswordService _passwordService;
        private IJwtTokenService _tokenService;
        private IConfiguration _config;

        public AuthenticationService(IUserRepository userRepository, IPasswordService passwordService, IJwtTokenService tokenService, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _passwordService = passwordService;
            _tokenService = tokenService;
            _config = configuration;
        }

        public async Task<AuthenticationDataForSignInResultDto> GenerateAccessTokenAndRefreshToken(AuthenticationDataForSignInDto signInDto)
        {
            var user = await _userRepository.GetUserByUsername(signInDto.Username);

            if (user is null || !_passwordService.VerifyPassword(signInDto.Password, user.PasswordHash, user.PasswordSalt)) 
            {
                throw new UserNotFoundException();
            }

            return new AuthenticationDataForSignInResultDto()
            {
                AccessToken = _tokenService.GenerateAccessToken(user, DateTime.UtcNow.AddSeconds(int.Parse(_config.GetSection("AppSettings:AccessTokenLifeTimeInSeconds").Value))),
                RefreshToken = _tokenService.GenerateRefreshToken(user, DateTime.UtcNow.AddSeconds(int.Parse(_config.GetSection("AppSettings:RefreshTokenLifeTimeInSeconds").Value))),
                TokenType = "Bearer"
            };
        }

        public async Task<AuthenticationDataForSignInResultDto> RefreshAccessToken(AuthenticationDataForRefreshTokenDto refreshTokenDto)
        {
            if (!_tokenService.ValidateRefreshToken(refreshTokenDto.RefreshToken, out var userId))
            {
                throw new RefreshTokenNotValidException("Refresh token is not valid");
            }

            var user = await _userRepository.GetByIdAsync(userId);

            if (user is null) 
            {
                throw new UserNotFoundException();
            }

            return new AuthenticationDataForSignInResultDto()
            {
                AccessToken = _tokenService.GenerateAccessToken(user, DateTime.UtcNow.AddMinutes(int.Parse(_config.GetSection("AppSettings:AccessTokenLifeTimeInSeconds").Value))),
                RefreshToken = _tokenService.GenerateRefreshToken(user, DateTime.UtcNow.AddDays(int.Parse(_config.GetSection("AppSettings:RefreshTokenLifeTimeInSeconds").Value))),
                TokenType = "Bearer"
            };
        }


    }
}

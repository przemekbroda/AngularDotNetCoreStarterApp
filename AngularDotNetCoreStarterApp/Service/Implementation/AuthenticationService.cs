using AngularDotNetCoreStarterApp.Dto;
using AngularDotNetCoreStarterApp.Exceptions;
using AngularDotNetCoreStarterApp.Repository;
using AngularDotNetCoreStarterApp.Service.Interface;
using System;
using System.Threading.Tasks;

namespace AngularDotNetCoreStarterApp.Service.Implementation
{
    public class AuthenticationService : IAuthenticationService
    {
        private IUserRepository _userRepository;
        private IPasswordService _passwordService;
        private IJwtTokenService _tokenService;

        public AuthenticationService(IUserRepository userRepository, IPasswordService passwordService, IJwtTokenService tokenService)
        {
            _userRepository = userRepository;
            _passwordService = passwordService;
            _tokenService = tokenService;
        }

        public async Task<AuthenticationDataForSignInResultDto> GenerateAccessTokenAndRefreshToken(AuthenticationDataForSignInDto signInDto)
        {
            var user = await _userRepository.GetUserByUsername(signInDto.Username.ToLower());

            if (user is null || !_passwordService.VerifyPassword(signInDto.Password, user.PasswordHash, user.PasswordSalt)) 
            {
                throw new UserNotFoundException();
            }

            return new AuthenticationDataForSignInResultDto()
            {
                AccessToken = _tokenService.GenerateAccessToken(user, DateTime.UtcNow.AddMinutes(1)),
                RefreshToken = _tokenService.GenerateRefreshToken(user, DateTime.UtcNow.AddDays(30))
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
                AccessToken = _tokenService.GenerateAccessToken(user, DateTime.UtcNow.AddMinutes(1)),
                RefreshToken = _tokenService.GenerateRefreshToken(user, DateTime.UtcNow.AddDays(30))
            };
        }


    }
}

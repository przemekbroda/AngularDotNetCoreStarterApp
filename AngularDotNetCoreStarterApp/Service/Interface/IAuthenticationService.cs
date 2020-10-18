using AngularDotNetCoreStarterApp.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetCoreStarterApp.Service.Interface
{
    public interface IAuthenticationService
    {
        Task<AuthenticationDataForSignInResultDto> GenerateAccessTokenAndRefreshToken(AuthenticationDataForSignInDto signInDto);
        Task<AuthenticationDataForSignInResultDto> RefreshAccessToken(AuthenticationDataForRefreshTokenDto refreshTokenDto);
    }
}

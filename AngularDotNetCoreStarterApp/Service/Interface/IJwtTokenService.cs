using AngularDotNetCoreStarterApp.Model;
using System;

namespace AngularDotNetCoreStarterApp.Service
{
    public interface IJwtTokenService
    {
        string GenerateAccessToken(User user, DateTime expireAt);
        string GenerateRefreshToken(User user, DateTime expireAt);
        bool ValidateRefreshToken(string refreshToken, out long id);
    }
}

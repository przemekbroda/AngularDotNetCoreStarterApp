using AngularDotNetCoreStarterApp.Dto;
using AngularDotNetCoreStarterApp.Service.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AngularDotNetCoreStarterApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(AuthenticationDataForSignInDto signInDto) 
        {
            return Ok(await _authenticationService.GenerateAccessTokenAndRefreshToken(signInDto));
        }

        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshAccessToken(AuthenticationDataForRefreshTokenDto refreshTokenDto) 
        {
            return Ok(await _authenticationService.RefreshAccessToken(refreshTokenDto));
        }


    }
}

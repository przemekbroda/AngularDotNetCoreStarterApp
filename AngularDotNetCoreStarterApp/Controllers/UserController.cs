using System.Threading.Tasks;
using AngularDotNetCoreStarterApp.Dto;
using AngularDotNetCoreStarterApp.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AngularDotNetCoreStarterApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateUser(UserForRegisterDto registerDto) 
        {
            return Ok(await _userService.CreateUser(registerDto));
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await _userService.GetUsers());
        }
    }
}

using AngularDotNetCoreStarterApp.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularDotNetCoreStarterApp.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    [ApiController]
    public class ErrorController : ControllerBase
    {
        [Route("/error")]
        public IActionResult Error() 
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
            var exception = context?.Error;

            int? code = null;
            string detail = null;

            if (exception is UserNotFoundException userNotFound) { code = StatusCodes.Status400BadRequest; detail = userNotFound.Message; }
            if (exception is UserExistsException userExists) { code = StatusCodes.Status400BadRequest; detail = userExists.Message; }

            return Problem(detail: detail, statusCode: code);
        }
    }
}

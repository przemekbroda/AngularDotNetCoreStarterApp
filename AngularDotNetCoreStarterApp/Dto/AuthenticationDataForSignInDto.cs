using System.ComponentModel.DataAnnotations;

namespace AngularDotNetCoreStarterApp.Dto
{
    public class AuthenticationDataForSignInDto
    {
        [Required]
        [MinLength(6)]
        public string Username { get; set; }

        [Required]
        [MinLength(8)]
        public string Password { get; set; }
    }
}

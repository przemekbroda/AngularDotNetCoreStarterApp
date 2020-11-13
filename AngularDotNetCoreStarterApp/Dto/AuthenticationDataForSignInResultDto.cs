namespace AngularDotNetCoreStarterApp.Dto
{
    public class AuthenticationDataForSignInResultDto
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string TokenType { get; set; }
    }
}

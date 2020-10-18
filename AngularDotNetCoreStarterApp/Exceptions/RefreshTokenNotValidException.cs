using System;

namespace AngularDotNetCoreStarterApp.Exceptions
{
    public class RefreshTokenNotValidException : Exception
    {
        public RefreshTokenNotValidException()
        {
        }

        public RefreshTokenNotValidException(string message) : base(message)
        {
        }
    }
}

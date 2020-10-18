using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetCoreStarterApp.Exceptions
{
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException()
        {
        }

        public UserNotFoundException(string message) : base(message)
        {
        }
    }
}

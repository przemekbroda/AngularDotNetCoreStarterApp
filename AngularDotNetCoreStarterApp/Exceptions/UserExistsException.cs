using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetCoreStarterApp.Exceptions
{
    public class UserExistsException : Exception
    {
        public UserExistsException()
        {
        }

        public UserExistsException(string message) : base(message)
        {
        }
    }
}

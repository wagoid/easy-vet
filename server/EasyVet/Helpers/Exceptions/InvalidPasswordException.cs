using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasyVet.Helpers.Exceptions
{
    public class InvalidPasswordException : Exception
    {
        public InvalidPasswordException(string message)
            : base(message)
        {
        }
    }
}
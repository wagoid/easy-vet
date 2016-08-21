using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasyVet.Helpers.Exceptions
{
    public class EntityNotFoundException : Exception
    {
        public EntityNotFoundException(string message)
            : base(message)
        {
        }
    }
}
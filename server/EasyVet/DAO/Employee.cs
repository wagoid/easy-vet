using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasyVet.DAO
{
    public class Employee : Generic.Base
    {
        public Employee() : base()
        {

        }

        public Employee(Interfaces.VetContext context) : base(context)
        {

        }


    }
}
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace easy_vet.Models
{
    public class Cashier : Employee
    {
        public new int Id { get; set; }
    }
}

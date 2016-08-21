using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace EasyVet.Models
{
    public class Employee : User
    {
        [Required]
        public decimal Salary { get; set; }
    }
}

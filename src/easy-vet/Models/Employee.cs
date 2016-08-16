using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace easy_vet.Models
{
    public class Employee : User
    {
        public new int Id { get; set; }
        [Required]
        public decimal Salary { get; set; }
    }
}

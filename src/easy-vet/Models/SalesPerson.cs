using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easy_vet.Models
{
    public class SalesPerson : Employee
    {
        public new int Id { get; set; }
        public string Specialty { get; set; }
    }
}

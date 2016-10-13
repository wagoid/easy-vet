using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EasyVet.Models
{
    [Table("Veterinaries")]
    public class Veterinary : Employee
    {
        //public new int Id { get; set; }
        public string Specialty { get; set; }
    }
}

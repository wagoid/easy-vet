using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EasyVet.Models
{
    public class Address : BaseEntity
    {
        [Required]
        public string StreetType { get; set; }
        [Required]
        public string StreetName { get; set; }
        [Required]
        public int Number { get; set; }
        public string Complement { get; set; }
        [Required]
        public string Neighbourhood { get; set; }
        [Required]
        public string Municipality { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string ZipCode { get; set; }
    }
}

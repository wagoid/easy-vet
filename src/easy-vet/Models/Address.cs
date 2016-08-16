using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace easy_vet.Models
{
    public class Address
    {
        public int Id { get; set; }
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

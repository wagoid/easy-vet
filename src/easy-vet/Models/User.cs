using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace easy_vet.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Cpf { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Password { get; set; }
        public DateTime BirdhDate { get; set; }
        [Required]
        public string PhoneNumber { get; set; }

        public Address Address { get; set; }
    }
}

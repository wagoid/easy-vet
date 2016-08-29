using EasyVet.Enumerations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EasyVet.Models
{
    public class User : BaseEntity
    {
        public User ()
        {
            this.Type = UserType.Costumer;
        }

        [Required]
        public string Cpf { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Password { get; set; }
        public DateTime BirthDate { get; set; }
        [Required]
        public string PhoneNumber { get; set; }

        public Address Address { get; set; }
        public UserType Type { get; set; }
    }
}

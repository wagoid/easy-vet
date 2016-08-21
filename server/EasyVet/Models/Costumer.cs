using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace EasyVet.Models
{
    [Table("Costumers")]
    public class Costumer : User
    {
        //public new int Id { get; set; }
        [Required]
        public string Email { get; set; }
    }
}

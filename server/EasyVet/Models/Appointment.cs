using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace EasyVet.Models
{
    public class Appointment : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public Veterinary Veterinary { get; set; }
        [Required]
        public Costumer Costumer { get; set; }
        [Required]
        public Animal Animal { get; set; }

    }
}

﻿using easy_vet.Enumerations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace easy_vet.Models
{
    public class Animal
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public AnimalTypes Type { get; set; }
        [Required]
        public string Gender { get; set; }
        public int Age { get; set; }

        [Required]
        public Costumer Owner { get; set; }
    }
}

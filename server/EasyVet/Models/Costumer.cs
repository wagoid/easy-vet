﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace EasyVet.Models
{
    [Table("Costumers")]
    public class Costumer : User
    {
        [Required]
        public string Email { get; set; }
    }
}

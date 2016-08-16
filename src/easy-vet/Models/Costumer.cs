using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace easy_vet.Models
{
    public class Costumer : User
    {
        public new int Id { get; set; }
        public string Email { get; set; }
    }
}

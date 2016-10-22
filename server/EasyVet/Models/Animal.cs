using EasyVet.Enumerations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EasyVet.Models
{
    public class Animal : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public AnimalTypes Type { get; set; }
        [Required]
        public string Gender { get; set; }
        public int Age { get; set; }

        [Required]
        [ForeignKey("Owner")]
        public int OwnerId { get; set; }

        public virtual Costumer Owner { get; set; }
    }
}

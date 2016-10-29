using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace EasyVet.Models
{
    public class Appointment : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Diagnosis { get; set; }
        public string Justification { get; set; }

        [Required]
        [ForeignKey("Veterinary")]
        public int VeterinaryId { get; set; }
        [Required]
        [ForeignKey("Costumer")]
        public int CostumerId { get; set; }
        [Required]
        [ForeignKey("Animal")]
        public int AnimalId { get; set; }

        public virtual Veterinary Veterinary { get; set; }
        public virtual Costumer Costumer { get; set; }
        public virtual Animal Animal { get; set; }
    }
}

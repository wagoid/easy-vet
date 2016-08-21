using EasyVet.Enumerations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EasyVet.Models
{
    public class Payment : BaseEntity
    {
        [Required]
        public PaymentMethod Method { get; set; }
        [Required]
        public PaymentStatus Status { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}

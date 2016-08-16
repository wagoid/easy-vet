using easy_vet.Enumerations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace easy_vet.Models
{
    public class Payment
    {
        public int Id { get; set; }
        [Required]
        public PaymentMethod Method { get; set; }
        [Required]
        public PaymentStatus Status { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}

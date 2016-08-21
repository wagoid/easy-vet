using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace EasyVet.Models
{
    public class Sale : BaseEntity
    {
        public decimal Value { get; set; }

        [Required]
        public Payment Payment;

        //Properties will be inserted into the objet manually
        [NotMapped]
        public ICollection<SaleProduct> SaleProducts { get; set; }
    }
}

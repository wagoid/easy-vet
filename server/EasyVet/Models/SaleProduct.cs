using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EasyVet.Models
{
    public class SaleProduct : BaseEntity
    {
        [Required]
        public Product Product { get; set; }
        [Required]
        public Sale Sale { get; set; }
    }
}

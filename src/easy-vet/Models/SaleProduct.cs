using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace easy_vet.Models
{
    public class SaleProduct
    {
        public int Id { get; set; }
        [Required]
        public Product Product { get; set; }
        [Required]
        public Sale Sale { get; set; }
    }
}

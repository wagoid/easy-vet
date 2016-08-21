using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EasyVet.Models
{
    public class Stock : BaseEntity
    {
        [Required]
        public Product Product { get; set; }
        [Required]
        public int Quantity { get; set; }
        //Each stock can be in its specific location, even for the same Products
        [Required]
        public Address Location { get; set; }
    }
}

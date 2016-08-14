using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easy_vet.Models
{
    public class Dog : Animal
    {
        public string Breed { get; set; }
        public decimal PawSize { get; set; }
    }
}

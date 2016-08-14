using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easy_vet.Models
{
    public class Animal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //TODO: Add an enumaration instead of string
        public string Type { get; set; }
    }
}

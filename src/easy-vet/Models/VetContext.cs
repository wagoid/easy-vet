using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace easy_vet.Models
{
    public class VetContext : DbContext
    {
        public VetContext(DbContextOptions<VetContext> options)
            : base(options)
        {

        }

        public DbSet<Animal> Animals { get; set; }
        public DbSet<Dog> Dogs { get; set; }
    }
}

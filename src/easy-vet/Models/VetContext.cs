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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().ToTable("Employees");
            modelBuilder.Entity<Cashier>().ToTable("Cashiers");
            modelBuilder.Entity<Costumer>().ToTable("Costumers");
            modelBuilder.Entity<Veterinary>().ToTable("Veterinaries");

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Cashier> Cashiers { get; set; }
        public DbSet<Costumer> Costumers { get; set; }
        public DbSet<Veterinary> Veterinaries { get; set; }
        public DbSet<SalesPerson> SalesPerson { get; set; }

        public DbSet<Appointment> Appointments { get; set; }

        public DbSet<Sale> Sales { get; set; }
        public DbSet<SaleProduct> SaleProducts { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Stock> Stocks { get; set; }


        public DbSet<Animal> Animals { get; set; }
        public DbSet<Dog> Dogs { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyVet.Models;
using System.Data.Entity;

namespace EasyVet.Tests.Mocks
{
    class VetContext : DbContext, Models.Interfaces.VetContext 
    {
        public VetContext() : base ()
        {
            this.Addresses = new Mocks.DbSet<Address>();
            this.Users = new Mocks.DbSet<User>();
            this.Employees = new Mocks.DbSet<Employee>();
            this.Cashiers = new Mocks.DbSet<Cashier>();
            this.Costumers = new Mocks.DbSet<Costumer>();
            this.Veterinaries = new Mocks.DbSet<Veterinary>();
            this.SalesPeople = new Mocks.DbSet<SalesPerson>();
            this.Appointments = new Mocks.DbSet<Appointment>();
            this.Sales = new Mocks.DbSet<Sale>();
            this.SaleProducts = new Mocks.DbSet<SaleProduct>();
            this.Payments = new Mocks.DbSet<Payment>();
            this.Products = new Mocks.DbSet<Product>();
            this.Stocks = new Mocks.DbSet<Stock>();
            this.Animals = new Mocks.DbSet<Animal>();
            this.Dogs = new Mocks.DbSet<Dog>();
        }

        public IDbSet<Address> Addresses { get; set; }
        public IDbSet<User> Users { get; set; }
        public IDbSet<Employee> Employees { get; set; }
        public IDbSet<Cashier> Cashiers { get; set; }
        public IDbSet<Costumer> Costumers { get; set; }
        public IDbSet<Veterinary> Veterinaries { get; set; }

        public IDbSet<SalesPerson> SalesPeople { get; set; }

        public IDbSet<Appointment> Appointments { get; set; }

        public IDbSet<Sale> Sales { get; set; }
        public IDbSet<SaleProduct> SaleProducts { get; set; }
        public IDbSet<Payment> Payments { get; set; }
        public IDbSet<Product> Products { get; set; }
        public IDbSet<Stock> Stocks { get; set; }


        public IDbSet<Animal> Animals { get; set; }
        public IDbSet<Dog> Dogs { get; set; }
    }
}

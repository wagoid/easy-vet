using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System.Data.Entity;
using System.Diagnostics;
using System;
using EasyVet.Models;

namespace EasyVet.DAO
{
    public class VetContext : DbContext, Interfaces.VetContext
    {
        public VetContext() : base("DefaultConnection")
        {

        }
        public VetContext(string connection)
            : base(connection)
        {

        }

        public static VetContext Create()
        {
            return new VetContext();
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
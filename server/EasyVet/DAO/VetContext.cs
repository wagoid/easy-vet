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

        public IDbSet<Models.Address> Addresses { get; set; }
        public IDbSet<Models.User> Users { get; set; }
        public IDbSet<Models.Employee> Employees { get; set; }
        public IDbSet<Models.Cashier> Cashiers { get; set; }
        public IDbSet<Models.Costumer> Costumers { get; set; }
        public IDbSet<Models.Veterinary> Veterinaries { get; set; }
        public IDbSet<Models.SalesPerson> SalesPeople { get; set; }

        public IDbSet<Models.Appointment> Appointments { get; set; }

        public IDbSet<Models.Sale> Sales { get; set; }
        public IDbSet<Models.SaleProduct> SaleProducts { get; set; }
        public IDbSet<Models.Payment> Payments { get; set; }
        public IDbSet<Models.Product> Products { get; set; }
        public IDbSet<Models.Stock> Stocks { get; set; }


        public IDbSet<Models.Animal> Animals { get; set; }
        public IDbSet<Models.Dog> Dogs { get; set; }
    }
}
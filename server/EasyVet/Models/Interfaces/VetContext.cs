using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace EasyVet.Models.Interfaces
{
    public interface VetContext
    {
        int SaveChanges();

        IDbSet<Address> Addresses { get; set; }
        IDbSet<User> Users { get; set; }
        IDbSet<Employee> Employees { get; set; }
        IDbSet<Cashier> Cashiers { get; set; }
        IDbSet<Costumer> Costumers { get; set; }
        IDbSet<Veterinary> Veterinaries { get; set; }
        IDbSet<SalesPerson> SalesPeople { get; set; }

        IDbSet<Appointment> Appointments { get; set; }

         IDbSet<Sale> Sales { get; set; }
         IDbSet<SaleProduct> SaleProducts { get; set; }
         IDbSet<Payment> Payments { get; set; }
         IDbSet<Product> Products { get; set; }
         IDbSet<Stock> Stocks { get; set; }


         IDbSet<Animal> Animals { get; set; }
         IDbSet<Dog> Dogs { get; set; }
    }
}
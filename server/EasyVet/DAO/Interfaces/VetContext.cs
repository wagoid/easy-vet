using EasyVet.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace EasyVet.DAO.Interfaces
{
    public interface VetContext
    {
        int SaveChanges();
        DbEntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
        Database Database { get; }

        IDbSet<Models.Address> Addresses { get; set; }
        IDbSet<Models.User> Users { get; set; }
        IDbSet<Models.Employee> Employees { get; set; }
        IDbSet<Models.Cashier> Cashiers { get; set; }
        IDbSet<Models.Costumer> Costumers { get; set; }
        IDbSet<Models.Veterinary> Veterinaries { get; set; }
        IDbSet<Models.SalesPerson> SalesPeople { get; set; }

        IDbSet<Models.Appointment> Appointments { get; set; }

         IDbSet<Models.Sale> Sales { get; set; }
         IDbSet<Models.SaleProduct> SaleProducts { get; set; }
         IDbSet<Models.Payment> Payments { get; set; }
         IDbSet<Models.Product> Products { get; set; }
         IDbSet<Models.Stock> Stocks { get; set; }


         IDbSet<Models.Animal> Animals { get; set; }
         IDbSet<Models.Dog> Dogs { get; set; }
    }
}
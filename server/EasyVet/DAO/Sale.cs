using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EasyVet.DAO
{
    public class Sale : Generic.Base
    {
        public Sale() : base()
        {

        }

        public Sale(Interfaces.VetContext context) : base(context)
        {
            
        }

        public List<Models.Sale> List()
        {
            var sales = context.Sales
                .Include(s => s.Payment)
                .Include(s => s.Costumer)
                .Include(s => s.SaleProducts)
                .ToList();

            sales.ForEach(sale => sale.SaleProducts.ForEach(sp => sp.Sale = null));

            return sales;
        }

        public Models.Sale FindById(int id)
        {
            return getFirstOrDefault(this.context.Sales, id);
        }

        public Models.Sale Insert(Models.Sale sale)
        {

            var payment = sale.Payment;
            payment.Date = DateTime.Now;
            this.context.Payments.Add(payment);
            this.context.SaveChanges();
            //sale.Payment = this.context.Payments.SingleOrDefault(p => p.Id == payment.Id);


            //context.Entry(sale.Payment).State = EntityState.Unchanged;
            //context.Entry(sale).State = EntityState.Added;
            //this.context.Sales.Add(sale);
            //this.context.SaveChanges();
            foreach (var saleProduct in sale.SaleProducts)
            {
                saleProduct.Sale = sale;
                this.context.SaleProducts.Add(saleProduct);
            }
            this.context.SaveChanges();
            sale.SaleProducts.ForEach(sp => sp.Sale = null);
            return sale;
        }

        public bool Delete(int id)
        {
            return delete(this.context.Sales, id);
        }
    }
}
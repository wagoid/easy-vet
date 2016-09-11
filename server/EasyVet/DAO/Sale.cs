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
            this.context.Payments.Add(sale.Payment);
            this.context.SaveChanges();
            
            foreach (var saleProduct in sale.SaleProducts)
            {
                saleProduct.Sale = sale;
                this.context.SaleProducts.Add(saleProduct);
            }
            this.context.SaveChanges();
            return sale;
        }

        public bool Update(Models.Sale sale)
        {
            var saleFromBd = context.Sales.FirstOrDefault(s => s.Id == sale.Id);
            throwEntityNotFoundWhenNull(saleFromBd, sale.Id);
            put(saleFromBd, sale);
            return true;
        }

        public bool Delete(int id)
        {
            return delete(this.context.Sales, id);
        }
    }
}
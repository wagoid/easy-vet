using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EasyVet.DAO
{
    public class Stock : Generic.Stock
    {
        public Stock() : base()
        {

        }

        public Stock(Interfaces.VetContext context) : base(context)
        {

        }

        public List<Models.Stock> List()
        {
            var stocks = context.Stocks
                .Include(p => p.Product)
                .Include(l => l.Location)
                .ToList();

            return stocks;
        }

        public Models.Stock FindById(int id)
        {
            return getFirstOrDefault(this.context.Stocks, id);
        }

        public Models.Stock AddProducts(Models.Stock stocks)
        {
            return postStock(context.Stocks, stocks);
        }

        public bool RemoveProducts(Models.Stock stocks)
        {
            var stocksFromBd = context.Stocks.FirstOrDefault(d => d.Id == stocks.Id);
            throwEntityNotFoundWhenNull(stocksFromBd, stocks.Id);
            stocksFromBd.Quantity = stocksFromBd.Quantity - stocks.Quantity;
            context.SaveChanges();
            return true;
        }

        public bool ProductAdd(Models.Stock stocks)
        {
            var stocksFromBd = context.Stocks.FirstOrDefault(d => d.Id == stocks.Id);
            throwEntityNotFoundWhenNull(stocksFromBd, stocks.Id);
            stocksFromBd.Quantity = stocksFromBd.Quantity + stocks.Quantity;
            context.SaveChanges();
            return true;
        }

        public bool Update(Models.Stock stock)
        {
            //return put(this.context.Stocks, stock);
            return true;
        }
        
        public bool Delete(int id)
        {
            return delete(context.Stocks, id);
        }
    }
}
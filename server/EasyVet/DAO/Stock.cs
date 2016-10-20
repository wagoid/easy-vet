using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasyVet.DAO
{
    public class Stock : Generic.Base
    {
        public Stock() : base()
        {

        }

        public Stock(Interfaces.VetContext context) : base(context)
        {

        }

        public List<Models.Stock> List()
        {
            return getList(this.context.Stocks);
        }

        public Models.Stock FindById(int id)
        {
            return getFirstOrDefault(this.context.Stocks, id);
        }

        public Models.Stock AddProducts(Models.Stock stocks)
        {
            return post(context.Stocks, stocks);
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
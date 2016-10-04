using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EasyVet.Enumerations;
using System.Web.Http;
using EasyVet.Helpers;
using System.Data.Entity;

namespace EasyVet.Controllers
{
    public class Stock : Generic.Base
    {

        private DAO.Stock stock;

        public Stock()
            : base()
        {
            stock = new DAO.Stock(context);
        }
        public Stock(DAO.Interfaces.VetContext context)
            : base(context)
        {
            this.context = context;
            stock = new DAO.Stock(this.context);
        }


        #region Stock HTTP methods

        [Route("api/stock")]
        [HttpGet]
        public Response<List<Models.Stock>> AllProducts()
        {
            return safelyRespond(() => stock.List());
        }

        [Route("api/stock")]
        [HttpPost]
        public Response<Models.Stock> PostProduct([FromBody]Models.Stock stock)
        {
            return safelyRespond(() => this.stock.Insert(stock));
        }

        [Route("api/stock")]
        [HttpPut]
        public Response<bool> PutProduct([FromBody]Models.Stock stock)
        {
            return safelyRespond(() => this.stock.Update(stock));
        }

        [Route("api/stock/{id}")]
        [HttpDelete]
        public Response<bool> DeleteProduct(int id)
        {
            return safelyRespond(() => stock.Delete(id));
        }

        #endregion


    }
}
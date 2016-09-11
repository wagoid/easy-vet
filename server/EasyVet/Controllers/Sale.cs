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
    public class Sale : Generic.Base
    {
        private DAO.Sale sale;
        private DAO.Product product;

        public Sale()
            : base()
        {
            sale = new DAO.Sale(context);
            product = new DAO.Product(context);
        }

        public Sale(DAO.Interfaces.VetContext context)
            : base(context)
        {
            sale = new DAO.Sale(this.context);
            product = new DAO.Product(this.context);
        }

        #region SaleProducts HTTP methods

        [Route("api/sale/{id}")]
        [HttpGet]
        public Response<Models.Sale> Product(int id)
        {
            return safelyRespond(() => sale.FindById(id));
        }

        [Route("api/sale")]
        [HttpPost]
        public Response<Models.Sale> PostSale([FromBody]Models.Sale sale)
        {
            return this.safelyRespond<Models.Sale>(() => {
                sale.Payment.Date = DateTime.Now;
                //Reset the references to Sale to remove the circular references so we can serialize it as JSON
                sale.SaleProducts.ForEach(sp => sp.Sale = null);
                return this.sale.Insert(sale);
            });
        }

        [Route("api/sale")]
        [HttpPut]
        public Response<bool> put([FromBody]Models.Sale sale)
        {
            return safelyRespond(() => this.sale.Update(sale));
        }

        [Route("api/sale/{id}")]
        [HttpPut]
        public Response<bool> delete(int id)
        {
            return safelyRespond(() => sale.Delete(id));
        }

        #endregion

        #region All sales Types HTTP methods

        [Route("api/sale")]
        [HttpGet]
        public Response<List<Models.Sale>> All()
        {
            return safelyRespond(() => sale.List());
        }

        #endregion

        #region Product HTTP methods

        [Route("api/sale/product/{id}")]
        [HttpGet]
        public Response<Models.Product> ProductById(int id)
        {
            return safelyRespond(() => product.FindById(id));
        }

        [Route("api/sale/product")]
        [HttpPost]
        public Response<Models.Product> PostProduct([FromBody]Models.Product product)
        {
            return safelyRespond(() => this.product.Insert(product));
        }

        [Route("api/sale/product")]
        [HttpPut]
        public Response<bool> PutProduct([FromBody]Models.Product product)
        {
            return safelyRespond(() => this.product.Update(product));
        }

        [Route("api/sale/product/{id}")]
        [HttpDelete]
        public Response<bool> DeleteProduct(int id)
        {
            return safelyRespond(() => product.Delete(id));
        }

        #endregion

        #region All product Types HTTP methods

        [Route("api/sale/product")]
        [HttpGet]
        public Response<List<Models.Product>> AllProducts()
        {
            return safelyRespond(() => product.List());
        }

        #endregion

    }
}
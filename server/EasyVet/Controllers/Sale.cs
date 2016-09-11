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

        public Sale()
            : base()
        {
            sale = new DAO.Sale(this.context);
        }

        public Sale(DAO.Interfaces.VetContext context)
            : base(context)
        {
            sale = new DAO.Sale(this.context);
        }

        #region SaleProducts HTTP methods

        [Route("api/sale/{id}")]
        [HttpGet]
        public Response<Models.Sale> Product(int id)
        {
            return this.safelyRespond<Models.Sale>(() => getFirstOrDefault(this.context.Sales, id));
        }

        [Route("api/sale")]
        [HttpPost]
        public Response<Models.Sale> PostSale([FromBody]Models.Sale sale)
        {
            return this.safelyRespond<Models.Sale>(() => this.sale.Insert(sale));
        }

        [Route("api/sale")]
        [HttpPut]
        public Response<bool> put([FromBody]Models.Sale sale)
        {
            return this.safelyRespond<bool>(() =>
            {
                var productFromBd = context.Sales.FirstOrDefault(person => person.Id == sale.Id);
                throwEntityNotFoundWhenNull(productFromBd, sale.Id);
                return put(productFromBd, sale);
            });
        }

        [Route("api/sale/{id}")]
        [HttpPut]
        public Response<bool> delete(int id)
        {
            return this.safelyRespond<bool>(() => delete(context.Sales, id));
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
        public Response<Models.Product> product(int id)
        {
            return this.safelyRespond<Models.Product>(() => getFirstOrDefault(this.context.Products, id));
        }

        [Route("api/sale/product")]
        [HttpPost]
        public Response<Models.Product> PostProduct([FromBody]Models.Product product)
        {
            return this.safelyRespond<Models.Product>(() => post(this.context.Products, product));
        }

        [Route("api/sale/product")]
        [HttpPut]
        public Response<bool> put([FromBody]Models.Product product)
        {
            return this.safelyRespond<bool>(() =>
            {
                var productFromBd = context.Products.FirstOrDefault(person => person.Id == product.Id);
                throwEntityNotFoundWhenNull(productFromBd, product.Id);
                return put(productFromBd, product);
            });
        }

        [Route("api/sale/product/{id}")]
        [HttpPut]
        public Response<bool> DeleteProduct(int id)
        {
            return this.safelyRespond<bool>(() => delete(context.Products, id));
        }

        #endregion

        #region All product Types HTTP methods

        [Route("api/sale/product")]
        [HttpGet]
        public Response<List<Models.Product>> AllProducts()
        {
            return safelyRespond(() => getList(context.Products));
        }

        #endregion

    }
}
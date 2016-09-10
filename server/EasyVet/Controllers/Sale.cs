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
        public string EncodePassword { get; private set; }

        public Sale()
            : base()
        {

        }

        public Sale(DAO.Interfaces.VetContext vetContext)
            : base(vetContext)
        {

        }

        #region SaleProducts HTTP methods

        [Route("api/sales/{id}")]
        [HttpGet]
        public Response<Models.Sale> Product(int id)
        {
            return this.safelyRespond<Models.Sale>(() => getFirstOrDefault(this.context.Sales, id));
        }

        [Route("api/sales")]
        [HttpPost]
        public Response<Models.Sale> PostSale([FromBody]Models.Sale sale)
        {
            return this.safelyRespond<Models.Sale>(() => post(this.context.Sales, sale));
        }

        [Route("api/sales")]
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

        [Route("api/sales/{id}")]
        [HttpPut]
        public Response<bool> delete(int id)
        {
            return this.safelyRespond<bool>(() => delete(context.Sales, id));
        }

        #endregion

        #region All sales Types HTTP methods

        [Route("api/sales/all")]
        [HttpGet]
        public Response<IList<Object>> All()
        {
            return safelyRespond<IList<Object>>(() =>
            {
                var Sales = new List<Object>();

                Sales.AddRange(getList(context.Sales));

                return Sales;
            });
        }

        #endregion

        #region Product HTTP methods

        [Route("api/product/{id}")]
        [HttpGet]
        public Response<Models.Product> product(int id)
        {
            return this.safelyRespond<Models.Product>(() => getFirstOrDefault(this.context.Products, id));
        }

        [Route("api/product")]
        [HttpPost]
        public Response<Models.Product> PostProduct([FromBody]Models.Product product)
        {
            return this.safelyRespond<Models.Product>(() => post(this.context.Products, product));
        }

        [Route("api/product")]
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

        [Route("api/product/{id}")]
        [HttpPut]
        public Response<bool> DeleteProduct(int id)
        {
            return this.safelyRespond<bool>(() => delete(context.Products, id));
        }

        #endregion

        #region All product Types HTTP methods

        [Route("api/product/all")]
        [HttpGet]
        public Response<IList<Object>> AllProducts()
        {
            return safelyRespond<IList<Object>>(() =>
            {
                var products = new List<Object>();

                products.AddRange(getList(context.Products));

                return products;
            });
        }

        #endregion

    }
}
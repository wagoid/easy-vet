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
    public class Product : Generic.GenericProduct
    {
        public string EncodePassword { get; private set; }

        public Product()
            : base()
        {

        }

        public Product(DAO.Interfaces.VetContext vetContext)
            : base(vetContext)
        {

        }

        #region Product HTTP methods

        [Route("api/product/{id}")]
        [HttpGet]
        public Response<Models.Product> product(int id)
        {
            return this.safelyRespond<Models.Product>(() => getProductFirstOrDefault(this.context.Products, id));
        }

        [Route("api/product")]
        [HttpPost]
        public Response<Models.Product> PostProduct([FromBody]Models.Product product)
        {
            return this.safelyRespond<Models.Product>(() => postProducts(context.Products, product));
        }

        [Route("api/product")]
        [HttpPut]
        public Response<bool> PutProduct([FromBody]Models.Product product)
        {
            return this.safelyRespond<bool>(() =>
            {
                var productFromBd = context.Products.FirstOrDefault(person => person.Id == product.Id);
                throwEntityNotFoundWhenNull(productFromBd, product.Id);
                return putProduct(productFromBd, product);
            });
        }

        [Route("api/product/{id}")]
        [HttpPut]
        public Response<bool> DeleteProduct(int id)
        {
            return this.safelyRespond<bool>(() => deleteProduct(context.Products, id));
        }

        #endregion

        #region All product Types HTTP methods

        [Route("api/product/all")]
        [HttpGet]
        public Response<IList<Object>> All()
        {
            return safelyRespond<IList<Object>>(() =>
            {
                var products = new List<Object>();

                products.AddRange(getProductList(context.Products));

                return products;
            });
        }

        #endregion

    }
}
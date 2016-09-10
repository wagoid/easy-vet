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
    public class Sale : Generic.GenericProduct
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
            return this.safelyRespond<Models.Sale>(() => getSaleFirstOrDefault(this.context.Sales, id));
        }

        [Route("api/sales")]
        [HttpPost]
        public Response<Models.Sale> PostProduct([FromBody]Models.Sale product)
        {
            return this.safelyRespond<Models.Sale>(() => postSales(context.Sales, product));
        }

        [Route("api/sales")]
        [HttpPut]
        public Response<bool> PutProduct([FromBody]Models.Sale sale)
        {
            return this.safelyRespond<bool>(() =>
            {
                var productFromBd = context.Sales.FirstOrDefault(person => person.Id == sale.Id);
                throwEntityNotFoundWhenNull(productFromBd, sale.Id);
                return putSale(productFromBd, sale);
            });
        }

        [Route("api/sales/{id}")]
        [HttpPut]
        public Response<bool> DeleteProduct(int id)
        {
            return this.safelyRespond<bool>(() => deleteSale(context.Sales, id));
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

                Sales.AddRange(getSaleList(context.Sales));

                return Sales;
            });
        }

        #endregion

    }
}
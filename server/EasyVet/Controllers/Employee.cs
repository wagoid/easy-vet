using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EasyVet.Models.Adapters;
using EasyVet.Enumerations;
using System.Web.Http;
using EasyVet.Helpers;
using System.Data.Entity;

namespace EasyVet.Controllers
{
    public class Employee : BaseController
    {
        public Employee() : base()
        {

        }

        public Employee(Models.Interfaces.VetContext vetContext) : base(vetContext) {

        }

        #region Veterinary HTTP methods 

        [Route("api/employee/veterinary")]
        [HttpGet]
        public Response<IList<Models.Veterinary>> Veterinaries()
        {
            return this.safelyRespond<IList<Models.Veterinary>>(() => getList(context.Veterinaries));
        }

        [Route("api/employee/veterinary/{id}")]
        [HttpGet]
        public Response<Models.Veterinary> Veterinary(int id)
        {
            return this.safelyRespond<Models.Veterinary>(() => getFirstOrDefault(this.context.Veterinaries, id));
        }

        [Route("api/employee/veterinary")]
        [HttpPost]
        public Response<int> PostVeterinary([FromBody]Models.Veterinary veterinary)
        {
            return this.safelyRespond<int>(() => post(context.Veterinaries, veterinary));
        }

        [Route("api/employee/veterinary")]
        [HttpPut]
        public Response<bool> PutVeterinary([FromBody]Models.Veterinary veterinary)
        {
            return this.safelyRespond<bool>(() => put(context.Veterinaries, veterinary));
        }

        [Route("api/employee/veterinary/{id}")]
        [HttpPut]
        public Response<bool> DeleteVeterinary(int id)
        {
            return this.safelyRespond<bool>(() => delete(context.Veterinaries, id));
        }

        #endregion

        #region Cashier HTTP methods

        [Route("api/employee/cashier")]
        [HttpGet]
        public Response<IList<Models.Cashier>> Cashiers()
        {
            return this.safelyRespond<IList<Models.Cashier>>(() => getList(context.Cashiers));
        }

        [Route("api/employee/cashier/{id}")]
        [HttpGet]
        public Response<Models.Cashier> Cashier(int id)
        {
            return this.safelyRespond<Models.Cashier>(() => getFirstOrDefault(this.context.Cashiers, id));
        }

        [Route("api/employee/cashier")]
        [HttpPost]
        public Response<int> PostCashier([FromBody]Models.Cashier cashier)
        {
            return this.safelyRespond<int>(() => post(context.Cashiers, cashier));
        }

        [Route("api/employee/cashier")]
        [HttpPut]
        public Response<bool> PutCashier([FromBody]Models.Cashier cashier)
        {
            return this.safelyRespond<bool>(() => put(context.Cashiers, cashier));
        }

        [Route("api/employee/Cashier/{id}")]
        [HttpPut]
        public Response<bool> DeleteCashier(int id)
        {
            return this.safelyRespond<bool>(() => delete(context.Cashiers, id));
        }

        #endregion

        #region SalesPerson HTTP methods

        [Route("api/employee/salesperson")]
        [HttpGet]
        public Response<IList<Models.SalesPerson>> SalesPeople()
        {
            return this.safelyRespond<IList<Models.SalesPerson>>(() => getList(context.SalesPeople));
        }

        [Route("api/employee/salesperson/{id}")]
        [HttpGet]
        public Response<Models.SalesPerson> SalesPerson(int id)
        {
            return this.safelyRespond<Models.SalesPerson>(() => getFirstOrDefault(this.context.SalesPeople, id));
        }

        [Route("api/employee/salesperson")]
        [HttpPost]
        public Response<int> PostSalesPerson([FromBody]Models.SalesPerson salesperson)
        {
            return this.safelyRespond<int>(() => post(context.SalesPeople, salesperson));
        }

        [Route("api/employee/salesperson")]
        [HttpPut]
        public Response<bool> PutSalesPerson([FromBody]Models.SalesPerson salesperson)
        {
            return this.safelyRespond<bool>(() => put(context.SalesPeople, salesperson));
        }

        [Route("api/employee/salesperson/{id}")]
        [HttpPut]
        public Response<bool> DeleteSalesPerson(int id)
        {
            return this.safelyRespond<bool>(() => delete(context.SalesPeople, id));
        }

        #endregion

        #region All employee Types HTTP methods

        [Route("api/employee/all")]
        [HttpGet]
        public Response<IList<Object>> All()
        {
            return safelyRespond <IList<Object>>(() =>
              {
                  var employees = new List<Object>();

                  employees.AddRange(getList(context.Cashiers));
                  employees.AddRange(getList(context.SalesPeople));
                  employees.AddRange(getList(context.Veterinaries));

                  return employees;
              });
        }

        #endregion

    }
}
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
    public class Employee : Generic.Base
    {
        private DAO.Cashier cashier;
        private DAO.SalesPerson salesPerson;
        private DAO.Veterinary veterinary;

        //As long as there is no use case for Employees,
        //and no use case mentioning employee management (like creation and deletion) whatsoever,
        //for now we are using an Employee Controller
        public Employee() : base()
        {
            cashier = new DAO.Cashier(context);
            salesPerson = new DAO.SalesPerson(context);
            veterinary = new DAO.Veterinary(context);
        }

        public Employee(DAO.Interfaces.VetContext context) : base(context)
        {
            this.context = context;
            cashier = new DAO.Cashier(context);
            salesPerson = new DAO.SalesPerson(context);
            veterinary = new DAO.Veterinary(context);
        }

        #region Veterinary HTTP methods 

        [Route("api/employee/veterinary")]
        [HttpGet]
        public Response<List<Models.Veterinary>> Veterinaries()
        {
            return safelyRespond(() => veterinary.List());
        }

        [Route("api/employee/veterinary/{id}")]
        [HttpGet]
        public Response<Models.Veterinary> Veterinary(int id)
        {
            return safelyRespond(() => veterinary.FindById(id));
        }

        [Route("api/employee/veterinary")]
        [HttpPost]
        public Response<Models.Veterinary> PostVeterinary([FromBody]Models.Veterinary veterinary)
        {
            return safelyRespond(() => this.veterinary.Insert(veterinary));
        }

        [Route("api/employee/veterinary")]
        [HttpPut]
        public Response<bool> PutVeterinary([FromBody]Models.Veterinary veterinary)
        {
            return safelyRespond(() => this.veterinary.Update(veterinary));
        }

        [Route("api/employee/veterinary/{id}")]
        [HttpPut]
        public Response<bool> DeleteVeterinary(int id)
        {
            return safelyRespond<bool>(() => veterinary.Delete(id));
        }

        #endregion

        #region Cashier HTTP methods

        [Route("api/employee/cashier")]
        [HttpGet]
        public Response<List<Models.Cashier>> Cashiers()
        {
            return this.safelyRespond(() => cashier.List());
        }

        [Route("api/employee/cashier/{id}")]
        [HttpGet]
        public Response<Models.Cashier> Cashier(int id)
        {
            return safelyRespond(() => cashier.FindById(id));
        }

        [Route("api/employee/cashier")]
        [HttpPost]
        public Response<Models.Cashier> PostCashier([FromBody]Models.Cashier cashier)
        {
            return safelyRespond(() => this.cashier.Insert(cashier));
        }

        [Route("api/employee/cashier")]
        [HttpPut]
        public Response<bool> PutCashier([FromBody]Models.Cashier cashier)
        {
            return safelyRespond<bool>(() => this.cashier.Update(cashier));
        }

        [Route("api/employee/Cashier/{id}")]
        [HttpPut]
        public Response<bool> DeleteCashier(int id)
        {
            return safelyRespond(() => cashier.Delete(id));
        }

        #endregion

        #region SalesPerson HTTP methods

        [Route("api/employee/salesperson")]
        [HttpGet]
        public Response<List<Models.SalesPerson>> SalesPeople()
        {
            return safelyRespond(() => salesPerson.List());
        }

        [Route("api/employee/salesperson/{id}")]
        [HttpGet]
        public Response<Models.SalesPerson> SalesPerson(int id)
        {
            return safelyRespond(() => salesPerson.FindById(id));
        }

        [Route("api/employee/salesperson")]
        [HttpPost]
        public Response<Models.SalesPerson> PostSalesPerson([FromBody]Models.SalesPerson salesPerson)
        {
            return safelyRespond(() => this.salesPerson.Insert(salesPerson));
        }

        [Route("api/employee/salesperson")]
        [HttpPut]
        public Response<bool> PutSalesPerson([FromBody]Models.SalesPerson salesPerson)
        {
            return safelyRespond(() => this.salesPerson.Update(salesPerson));
        }

        [Route("api/employee/salesperson/{id}")]
        [HttpPut]
        public Response<bool> DeleteSalesPerson(int id)
        {
            return safelyRespond(() => salesPerson.Delete(id));
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

                  employees.AddRange(cashier.List());
                  employees.AddRange(salesPerson.List());
                  employees.AddRange(veterinary.List());

                  return employees;
              });
        }

        #endregion

    }
}
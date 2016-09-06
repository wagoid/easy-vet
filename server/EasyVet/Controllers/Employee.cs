﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EasyVet.Enumerations;
using System.Web.Http;
using EasyVet.Helpers;
using System.Data.Entity;

namespace EasyVet.Controllers
{
    public class Employee : BaseController
    {
        public string EncodePassword { get; private set; }

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
            return this.safelyRespond<IList<Models.Veterinary>>(() => getEmployeeList(context.Veterinaries));
        }

        [Route("api/employee/veterinary/{id}")]
        [HttpGet]
        public Response<Models.Veterinary> Veterinary(int id)
        {
            return this.safelyRespond<Models.Veterinary>(() => getEmployeeFirstOrDefault(this.context.Veterinaries, id));
        }

        [Route("api/employee/veterinary")]
        [HttpPost]
        public Response<int> PostVeterinary([FromBody]Models.Veterinary veterinary)
        {
            veterinary.Password = PasswordEncoder.EncodePassword(veterinary.Password);
            return this.safelyRespond<int>(() => postEmployee(context.Veterinaries, veterinary));
        }

        [Route("api/employee/veterinary")]
        [HttpPut]
        public Response<bool> PutVeterinary([FromBody]Models.Veterinary veterinary)
        {
            var newPassword = PasswordEncoder.EncodePassword(veterinary.Password);
            if (veterinary.Password != newPassword)
            {
                veterinary.Password = newPassword;
            }
            veterinary.Password = PasswordEncoder.EncodePassword(veterinary.Password);
            return this.safelyRespond<bool>(() => putEmployee(context.Veterinaries, veterinary));
        }

        [Route("api/employee/veterinary/{id}")]
        [HttpPut]
        public Response<bool> DeleteVeterinary(int id)
        {
            return this.safelyRespond<bool>(() => deleteEmployee(context.Veterinaries, id));
        }

        #endregion

        #region Cashier HTTP methods

        [Route("api/employee/cashier")]
        [HttpGet]
        public Response<IList<Models.Cashier>> Cashiers()
        {
            return this.safelyRespond<IList<Models.Cashier>>(() => getEmployeeList(context.Cashiers));
        }

        [Route("api/employee/cashier/{id}")]
        [HttpGet]
        public Response<Models.Cashier> Cashier(int id)
        {
            return this.safelyRespond<Models.Cashier>(() => getEmployeeFirstOrDefault(this.context.Cashiers, id));
        }

        [Route("api/employee/cashier")]
        [HttpPost]
        public Response<int> PostCashier([FromBody]Models.Cashier cashier)
        {
            cashier.Password = PasswordEncoder.EncodePassword(cashier.Password);
            return this.safelyRespond<int>(() => postEmployee(context.Cashiers, cashier));
        }

        [Route("api/employee/cashier")]
        [HttpPut]
        public Response<bool> PutCashier([FromBody]Models.Cashier cashier)
        {
            var newPassword = PasswordEncoder.EncodePassword(cashier.Password);
            if (cashier.Password != newPassword)
            {
                cashier.Password = newPassword;
            }
            return this.safelyRespond<bool>(() => putEmployee(context.Cashiers, cashier));
        }

        [Route("api/employee/Cashier/{id}")]
        [HttpPut]
        public Response<bool> DeleteCashier(int id)
        {
            return this.safelyRespond<bool>(() => deleteEmployee(context.Cashiers, id));
        }

        #endregion

        #region SalesPerson HTTP methods

        [Route("api/employee/salesperson")]
        [HttpGet]
        public Response<IList<Models.SalesPerson>> SalesPeople()
        {
            return this.safelyRespond<IList<Models.SalesPerson>>(() => getEmployeeList(context.SalesPeople));
        }

        [Route("api/employee/salesperson/{id}")]
        [HttpGet]
        public Response<Models.SalesPerson> SalesPerson(int id)
        {
            return this.safelyRespond<Models.SalesPerson>(() => getEmployeeFirstOrDefault(this.context.SalesPeople, id));
        }

        [Route("api/employee/salesperson")]
        [HttpPost]
        public Response<int> PostSalesPerson([FromBody]Models.SalesPerson salesperson)
        {
            salesperson.Password = PasswordEncoder.EncodePassword(salesperson.Password);
            return this.safelyRespond<int>(() => postEmployee(context.SalesPeople, salesperson));
        }

        [Route("api/employee/salesperson")]
        [HttpPut]
        public Response<bool> PutSalesPerson([FromBody]Models.SalesPerson salesperson)
        {
            var newPassword = PasswordEncoder.EncodePassword(salesperson.Password);
            if (salesperson.Password != newPassword)
            {
                salesperson.Password = newPassword;
            }
            return this.safelyRespond<bool>(() => putEmployee(context.SalesPeople, salesperson));
        }

        [Route("api/employee/salesperson/{id}")]
        [HttpPut]
        public Response<bool> DeleteSalesPerson(int id)
        {
            return this.safelyRespond<bool>(() => deleteEmployee(context.SalesPeople, id));
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

                  employees.AddRange(getEmployeeList(context.Cashiers));
                  employees.AddRange(getEmployeeList(context.SalesPeople));
                  employees.AddRange(getEmployeeList(context.Veterinaries));

                  return employees;
              });
        }

        #endregion

    }
}
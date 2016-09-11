using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasyVet.DAO
{
    public class SalesPerson : Generic.Employee
    {
        public SalesPerson() : base()
        {

        }

        public SalesPerson(Interfaces.VetContext context) : base(context)
        {

        }

        public List<Models.SalesPerson> List()
        {
            return getEmployeeList(this.context.SalesPeople);
        }

        public Models.SalesPerson FindById(int id)
        {
            return getEmployeeFirstOrDefault(this.context.SalesPeople, id);
        }

        public Models.SalesPerson Insert(Models.SalesPerson salesPerson)
        {
            return postEmployee(context.SalesPeople, salesPerson);
        }

        public bool Update(Models.SalesPerson salesPerson)
        {
            return putEmployee(this.context.SalesPeople, salesPerson);
        }

        public bool Delete(int id)
        {
            return delete(context.Employees, id);
        }
    }
}
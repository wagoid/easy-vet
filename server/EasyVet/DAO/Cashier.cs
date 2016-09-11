using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasyVet.DAO
{
    public class Cashier : Generic.Employee
    {
        public Cashier() : base()
        {

        }

        public Cashier(Interfaces.VetContext context) : base(context)
        {

        }

        public List<Models.Cashier> List()
        {
            return getEmployeeList(this.context.Cashiers);
        }

        public Models.Cashier FindById(int id)
        {
            return getEmployeeFirstOrDefault(this.context.Cashiers, id);
        }

        public Models.Cashier Insert(Models.Cashier cashier)
        {
            return postEmployee(context.Cashiers, cashier);
        }

        public bool Update(Models.Cashier cashier)
        {
            return putEmployee(this.context.Cashiers, cashier);
        }

        public bool Delete(int id)
        {
            return delete(context.Employees, id);
        }
    }
}
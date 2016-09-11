using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasyVet.DAO
{
    public class Veterinary : Generic.Employee
    {
        public Veterinary() : base()
        {

        }

        public Veterinary(Interfaces.VetContext context) : base(context)
        {

        }

        public List<Models.Veterinary> List()
        {
            return getEmployeeList(this.context.Veterinaries);
        }

        public Models.Veterinary FindById(int id)
        {
            return getEmployeeFirstOrDefault(this.context.Veterinaries, id);
        }

        public Models.Veterinary Insert(Models.Veterinary veterinary)
        {
            return postEmployee(context.Veterinaries, veterinary);
        }

        public bool Update(Models.Veterinary veterinary)
        {
            return putEmployee(this.context.Veterinaries, veterinary);
        }

        public bool Delete(int id)
        {
            return delete(context.Employees, id);
        }
    }
}
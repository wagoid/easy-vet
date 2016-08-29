using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace EasyVet.Models
{
    [Table("Cashier")]
    public class Cashier : Employee
    {

        public static Cashier Factory(Adapters.GenericEmployee employee)
        {
            return new Cashier()
            {
                Address = employee.Address,
                BirthDate = employee.BirthDate,
                Cpf = employee.Cpf,
                Name = employee.Name,
                Password = employee.Password,
                PhoneNumber = employee.PhoneNumber,
                Salary = employee.Salary,
                Type = employee.Type
            };
        }
    }
}

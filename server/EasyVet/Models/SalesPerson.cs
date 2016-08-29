using System.ComponentModel.DataAnnotations.Schema;

namespace EasyVet.Models
{
    [Table("SalesPeople")]
    public class SalesPerson : Employee
    {

        public static SalesPerson Factory(Adapters.GenericEmployee employee)
        {
            return new SalesPerson()
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

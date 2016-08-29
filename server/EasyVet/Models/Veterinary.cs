using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EasyVet.Models
{
    [Table("Veterinaries")]
    public class Veterinary : Employee
    {
        //public new int Id { get; set; }
        public string Specialty { get; set; }

        public List<Appointment> Appointments { get; set; }

        public static Veterinary Factory(Adapters.GenericEmployee employee)
        {
            return new Veterinary()
            {
                Address = employee.Address,
                BirthDate = employee.BirthDate,
                Cpf = employee.Cpf,
                Name = employee.Name,
                Password = employee.Password,
                PhoneNumber = employee.PhoneNumber,
                Salary = employee.Salary,
                Specialty = employee.Specialty,
                Type = employee.Type
            };
        }
    }
}

using EasyVet.Enumerations;
using System;

namespace EasyVet.Models.Adapters
{
    public class GenericEmployee
    {
        public static GenericEmployee Factory<TEntity> (TEntity entity) where TEntity : Employee
        {
            return new GenericEmployee()
            {
                Id = entity.Id,
                Cpf = entity.Cpf,
                Name = entity.Name,
                Password = entity.Password,
                BirthDate = entity.BirthDate,
                PhoneNumber = entity.PhoneNumber,
                Address = entity.Address,
                Type = entity.Type,
                Salary = entity.Salary
            };
        }

        /* User properties */
        public int Id { get; set; }
        public string Cpf { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public DateTime BirthDate { get; set; }
        public string PhoneNumber { get; set; }
        public UserType Type { get; set; }
        public Address Address { get; set; }


        /* Employee properties */
        public decimal Salary { get; set; }

        /* Veterinary properties */
        public string Specialty { get; set; }

    }
}
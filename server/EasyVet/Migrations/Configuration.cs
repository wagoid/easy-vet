namespace EasyVet.Migrations
{
    using DAO;
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<EasyVet.DAO.VetContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(VetContext context)
        {
            if (context.Addresses.ToList().Count == 0)
            {
                var address = new Address() { StreetName = "Rua dos bobos", Municipality = "Belo Horizonte", Neighbourhood = "Mantiqueira", State = "Minas Gerais", Number = 0, StreetType = "Rua", ZipCode = "31655-155" };
                context.Addresses.Add(address);
                var veterinary = new Models.Veterinary() {
                    Address = address,
                    BirthDate = DateTime.Now,
                    Cpf = "11769446656",
                    Name = "Wag�o admin",
                    Password = "TGAVME13emBkFCet7th82nf88v6cpxKfRW10REteYPE=",
                    PhoneNumber = "666",
                    Salary = 11575.58m,
                    Specialty = "Nenhuma",
                    Type = Enumerations.UserType.Veterinary};
                context.Veterinaries.Add(veterinary);
            }
        }
    }
}

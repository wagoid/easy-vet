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
                var veterinary = new Veterinary() {
                    Address = address,
                    BirthDate = DateTime.Now,
                    Cpf = "11769446656",
                    Name = "Wagão admin",
                    Password = "fAYqnJi3eB1hWhYxGChFLqo7+dhvkgBdGJPoEMWd+xI=",
                    PhoneNumber = "666",
                    Salary = 11575.58m,
                    Specialty = "Nenhuma" };
                context.Veterinaries.Add(veterinary);
            }
           
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}

namespace EasyVet.Migrations
{
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<EasyVet.Models.VetContext>
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
                var veterinary = new Veterinary() { Address = address, BirdhDate = DateTime.Now, Cpf = "117.694.466-12", Name = "Wagao", Password = "uabafet", PhoneNumber = "666", Salary = 11575.58m, Specialty = "fodedor" };
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

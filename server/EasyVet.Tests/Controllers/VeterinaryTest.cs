using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using EasyVet;
using EasyVet.Helpers;
using EasyVet.Models;
using System.Data.Entity;

namespace EasyVet.Tests.Controllers
{
    [TestClass]
    public class VeterinaryTest
    {
        private Mocks.VetContext context;
        [TestInitialize()]
        public void Initialize()
        {
            context = new Mocks.VetContext();
            var address = new Address() { StreetName = "Rua dos bobos", Municipality = "Belo Horizonte", Neighbourhood = "Mantiqueira", State = "Minas Gerais", Number = 0, StreetType = "Rua", ZipCode = "31655-155" };
            context.Addresses.Add(address);
            context.SaveChanges();
        }
        [TestCleanup()]
        public void ClearDb()
        {
            context.Addresses.ToList().ForEach(a => context.Addresses.Remove(a));
            context.SaveChanges();
        }

        [TestMethod]
        public void EnsureAllResponsePropertiesAreNul()
        {
            var controller = new EasyVet.Controllers.Veterinary(context);

            var response = controller.Get();

            Assert.IsNotNull(response);
            Assert.IsNotNull(response.Data);
            Assert.AreEqual(0, response.Data.Count());
            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
        }

        [TestMethod]
        public void EnsureGetAllVeterinaries()
        {
            var controller = new EasyVet.Controllers.Veterinary(context);

            var firstAddress = context.Addresses.First();
            var secondAddress = new Address() { StreetName = "bla", Complement = "bla", Municipality = "bla", Neighbourhood = "bla", Number = 10, State = "bla", StreetType = "bla", ZipCode = "bla" };
            
            var firstVeterinary = new Veterinary() { Address = firstAddress, BirthDate = DateTime.Now, Cpf = "14", Name = "as", Password = "as", PhoneNumber = "as", Salary = 1500, Specialty = "dsadsa" };
            var secondVeterinary = new Veterinary() { Address = secondAddress, BirthDate = DateTime.Now, Cpf = "1", Name = "2", Password = "4", PhoneNumber = "h", Salary = 1500, Specialty = "dsadsa" };
            context.Veterinaries.Add(firstVeterinary);
            context.Veterinaries.Add(secondVeterinary);
            context.SaveChanges();

            // Act
            var response = controller.Get();

            // Assert
            Assert.IsNotNull(response);
            Assert.IsNotNull(response.Data);
            Assert.AreEqual(2, response.Data.Count());
            Assert.AreEqual(firstVeterinary, response.Data[0]);
            Assert.AreEqual(secondVeterinary, response.Data[1]);
            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
        }

        [TestMethod]
        public void EnsureRespondsWithError()
        {
            var controller = new EasyVet.Controllers.Veterinary(context);
            context.Veterinaries.Add(new Veterinary() { Address = context.Addresses.First(), BirthDate = DateTime.Now, Cpf = "1", Name = "2", Password = "4", PhoneNumber = "h", Salary = 1500, Specialty = "dsadsa" });

            context.ThrowWhenAccessingDbSet = true;
            var response = controller.Get();

            Assert.IsNotNull(response);
            Assert.IsNull(response.Data);
            Assert.IsNotNull(response.Message);
            Assert.IsNotNull(response.Type);
            Assert.AreEqual("Exception", response.Type);
        }

        [TestMethod]
        public void EnsureGetByIdReturnsTheVeterinary()
        {
            var controller = new EasyVet.Controllers.Veterinary(context);
            var veterinary = new Veterinary() { Address = context.Addresses.First(), BirthDate = DateTime.Now, Cpf = "1", Name = "2", Password = "4", PhoneNumber = "h", Salary = 1500, Specialty = "dsadsa" };
            context.Veterinaries.Add(veterinary);
            context.SaveChanges();

            var response = controller.Get(veterinary.Id);

            Assert.IsNotNull(response);
            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
            Assert.IsNotNull(response.Data);
            Assert.AreEqual(veterinary, response.Data);
        }

        [TestMethod]
        public void EnsureNothingIsReturnedWhenIdNotFound()
        {
            var controller = new EasyVet.Controllers.Veterinary(context);

            var response = controller.Get(1);

            Assert.IsNotNull(response);
            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
            Assert.IsNull(response.Data);
        }

        [TestMethod]
        public void EnsurePostCorrectlyAdds()
        {
            var controller = new EasyVet.Controllers.Veterinary();
            var veterinary = new Veterinary() { Address = context.Addresses.First(), BirthDate = DateTime.Now, Cpf = "1", Name = "2", Password = "4", PhoneNumber = "h", Salary = 1500, Specialty = "dsadsa" };
            
            var response = controller.Post(veterinary);

            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
            Assert.IsNotNull(response.Data);
            Assert.AreEqual(veterinary, response.Data);
        }

        [TestMethod]
        public void EnsurePutUpdatesCorrectly()
        {
            var controller = new EasyVet.Controllers.Veterinary();
            var veterinary = new Veterinary() { Address = context.Addresses.First(), BirthDate = DateTime.Now, Cpf = "1", Name = "2", Password = "4", PhoneNumber = "h", Salary = 1500, Specialty = "dsadsa" };
            context.Veterinaries.Add(veterinary);
            context.SaveChanges();

            var response = controller.Put(new Models.Veterinary() { Id = veterinary.Id });

            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
            Assert.IsNotNull(response.Data);
            Assert.AreEqual(veterinary.Id, response.Data);
        }

        [TestMethod]
        public void EnsureVeterinaryIsDeleted()
        {
            var controller = new EasyVet.Controllers.Veterinary(context);

            var veterinary = new Veterinary() { Address = context.Addresses.First(), BirthDate = DateTime.Now, Cpf = "1", Name = "2", Password = "4", PhoneNumber = "h", Salary = 1500, Specialty = "dsadsa" };
            context.Veterinaries.Add(veterinary);
            context.SaveChanges();

            Assert.IsNotNull(context.Veterinaries.FirstOrDefault());

            var response = controller.Delete(veterinary.Id);

            Assert.IsTrue(response.Data);
            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
        }

        [TestMethod]
        public void EnsureExceptionIsThrownWhenNotFound()
        {
            var controller = new EasyVet.Controllers.Veterinary(context);


            var response = controller.Delete(1231312312);

            Assert.IsFalse(response.Data);
            Assert.IsNotNull(response.Type);
            Assert.IsNotNull(response.Message);
            Assert.AreEqual(typeof(EasyVet.Helpers.Exceptions.EntityNotFoundException).Name, response.Type);
        }
    }
}

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
    public class EmployeeTest
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
        public void EnsureAllResponsePropertiesAreNull()
        {
            var controller = new EasyVet.Controllers.Employee(context);

            var response = controller.All();

            assertAllResponsePropertiesAreNull<IList<Object>, Object>(controller.All());
            assertAllResponsePropertiesAreNull<IList<Veterinary>, Veterinary>(controller.Veterinaries());
            assertAllResponsePropertiesAreNull<IList<Cashier>, Cashier>(controller.Cashiers());
            assertAllResponsePropertiesAreNull<IList<SalesPerson>, SalesPerson>(controller.SalesPeople());
        }

        private void assertAllResponsePropertiesAreNull<T, TEntity>(Response<T> response) where T : IList<TEntity>
        {
            Assert.IsNotNull(response);
            Assert.IsNotNull(response.Data);
            Assert.AreEqual(0, response.Data.Count());
            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
        }

        [TestMethod]
        public void EnsureGetAllVeterinaries()
        {
            assertGetAllEmployees(context.Veterinaries, new EasyVet.Controllers.Employee().Veterinaries);
        }

        [TestMethod]
        public void EnsureGetAllCashiers()
        {
            assertGetAllEmployees(context.Cashiers, new EasyVet.Controllers.Employee().Cashiers);
        }

        [TestMethod]
        public void EnsureGetAllSalesPeople()
        {
            assertGetAllEmployees(context.SalesPeople, new EasyVet.Controllers.Employee().SalesPeople);
        }

        private void assertGetAllEmployees<TEntity>(IDbSet<TEntity> collection, Func<Response<IList<TEntity>>> getMethod) where TEntity : Employee, new()
        {
            var controller = new EasyVet.Controllers.Employee(context);

            var firstAddress = context.Addresses.First();
            var secondAddress = new Address() { StreetName = "bla", Complement = "bla", Municipality = "bla", Neighbourhood = "bla", Number = 10, State = "bla", StreetType = "bla", ZipCode = "bla" };

            var firstEntity = new TEntity() { Address = firstAddress, BirthDate = DateTime.Now, Cpf = "14", Name = "as", Password = "as", PhoneNumber = "as", Salary = 1500 };
            var secondEntity = new TEntity() { Address = secondAddress, BirthDate = DateTime.Now, Cpf = "1", Name = "2", Password = "4", PhoneNumber = "h", Salary = 1500 };
            collection.Add(firstEntity);
            collection.Add(secondEntity);
            context.SaveChanges();

            var response = getMethod();

            Assert.IsNotNull(response);
            Assert.IsNotNull(response.Data);
            Assert.AreEqual(2, response.Data.Count());
            Assert.AreEqual(firstEntity, response.Data[0]);
            Assert.AreEqual(secondEntity, response.Data[1]);
            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
        }

        [TestMethod]
        public void EnsureRespondsWithError()
        {
            var controller = new EasyVet.Controllers.Employee(context);
            context.Veterinaries.Add(new Veterinary() { Address = context.Addresses.First(), BirthDate = DateTime.Now, Cpf = "1", Name = "2", Password = "4", PhoneNumber = "h", Salary = 1500, Specialty = "dsadsa" });

            context.Veterinaries = null;
            assertRespondsWithError(controller.Veterinaries());

            context.SalesPeople = null;
            assertRespondsWithError(controller.SalesPeople());

            context.Cashiers = null;
            assertRespondsWithError(controller.Cashiers());
        }

        private void assertRespondsWithError<T>(Response<T> response)
        {
            Assert.IsNotNull(response);
            Assert.IsNull(response.Data);
            Assert.IsNotNull(response.Message);
            Assert.IsNotNull(response.Type);
            Assert.AreEqual("ArgumentNullException", response.Type);
        }


        [TestMethod]
        public void EnsureGetByIdReturnsTheVeterinary()
        {
            var controller = new EasyVet.Controllers.Employee(context);
            assertGetByIdReturnsTheVeterinary(context.Veterinaries, controller.Veterinary);
        }

        [TestMethod]
        public void EnsureGetByIdReturnsTheCashier()
        {
            var controller = new EasyVet.Controllers.Employee(context);
            assertGetByIdReturnsTheVeterinary(context.Cashiers, controller.Cashier);
        }

        [TestMethod]
        public void EnsureGetByIdReturnsTheSalesPerson()
        {
            var controller = new EasyVet.Controllers.Employee(context);
            assertGetByIdReturnsTheVeterinary(context.SalesPeople, controller.SalesPerson);
        }

        public void assertGetByIdReturnsTheVeterinary<TEntity>(IDbSet<TEntity> collection, Func<int, Response<TEntity>> findMethod)
            where TEntity : Employee, new()
        {
            var entity = new TEntity() { Address = context.Addresses.First(), BirthDate = DateTime.Now, Cpf = "1", Name = "2", Password = "4", PhoneNumber = "h", Salary = 1500 };
            collection.Add(entity);
            context.SaveChanges();

            var response = findMethod(entity.Id);

            Assert.IsNotNull(response);
            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
            Assert.IsNotNull(response.Data);
            Assert.AreEqual(entity, response.Data);
        }

        [TestMethod]
        public void EnsureNothingIsReturnedWhenIdNotFound()
        {
            var controller = new EasyVet.Controllers.Employee(context);
            assertNothingIsReturnedWhenIdNotFound(controller.Veterinary);
            assertNothingIsReturnedWhenIdNotFound(controller.Cashier);
            assertNothingIsReturnedWhenIdNotFound(controller.SalesPerson);
        }
        public void assertNothingIsReturnedWhenIdNotFound<TEntity>(Func<int, Response<TEntity>> entityFindMethod)
        {
            var controller = new EasyVet.Controllers.Employee(context);

            var response = entityFindMethod(10);

            Assert.IsNotNull(response);
            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
            Assert.IsNull(response.Data);
        }

        [TestMethod]
        public void EnsurePostCorrectlyAdds()
        {
            var controller = new EasyVet.Controllers.Employee();
            assertPostCorrectlyAdds(context.Veterinaries, controller.PostVeterinary);
            assertPostCorrectlyAdds(context.Cashiers, controller.PostCashier);
            assertPostCorrectlyAdds(context.SalesPeople, controller.PostSalesPerson);
        }

        private void assertPostCorrectlyAdds<TEntity>(IDbSet<TEntity> collection, Func<TEntity, Response<int>> postMethod)
            where TEntity : Employee, new()
        {
            var veterinary = new TEntity() { Address = context.Addresses.First(), BirthDate = DateTime.Now, Cpf = "1", Name = "2", Password = "4", PhoneNumber = "h", Salary = 1500 };

            var response = postMethod(veterinary);

            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
            Assert.IsNotNull(response.Data);
            Assert.AreEqual(veterinary.Id, response.Data);
        }

        [TestMethod]
        public void EnsurePutUpdatesCorrectly()
        {
            var controller = new EasyVet.Controllers.Employee();
            assertPutCorrectlyAdds(context.Veterinaries, controller.PutVeterinary);
            assertPutCorrectlyAdds(context.Cashiers, controller.PutCashier);
            assertPutCorrectlyAdds(context.SalesPeople, controller.PutSalesPerson);
        }

        private void assertPutCorrectlyAdds<TEntity>(IDbSet<TEntity> collection, Func<TEntity, Response<bool>> putMethod)
            where TEntity : Employee, new()
        {
            var entity = new TEntity() { Address = context.Addresses.First(), BirthDate = DateTime.Now, Cpf = "1", Name = "2", Password = "4", PhoneNumber = "h", Salary = 1500 };

            var response = putMethod(entity);

            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
            Assert.IsNotNull(response.Data);
            Assert.AreEqual(true, response.Data);
        }

        [TestMethod]
        public void EnsureVeterinaryIsDeleted()
        {
            var controller = new EasyVet.Controllers.Employee(context);
            assertEntityDeletes(context.Veterinaries, controller.DeleteVeterinary);
            assertEntityDeletes(context.Cashiers, controller.DeleteCashier);
            assertEntityDeletes(context.SalesPeople, controller.DeleteSalesPerson);
        }

        private void assertEntityDeletes<TEntity>(IDbSet<TEntity> collection, Func<int, Response<bool>> deleteMethod)
            where TEntity : Employee, new()
        {
            var entity = new TEntity() { Address = context.Addresses.First(), BirthDate = DateTime.Now, Cpf = "1", Name = "2", Password = "4", PhoneNumber = "h", Salary = 1500 };
            collection.Add(entity);
            context.SaveChanges();

            var response = deleteMethod(entity.Id);

            Assert.IsTrue(response.Data);
            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
        }

        [TestMethod]
        public void EnsureExceptionIsThrownWhenNotFound()
        {
            var controller = new EasyVet.Controllers.Employee(context);

            assertExceptionIsThrownWhenNotFound(controller.DeleteVeterinary);
            assertExceptionIsThrownWhenNotFound(controller.DeleteCashier);
            assertExceptionIsThrownWhenNotFound(controller.DeleteSalesPerson);
        }

        private void assertExceptionIsThrownWhenNotFound(Func<int, Response<bool>> deleteMethod)
        {
            var response = deleteMethod(321323123);

            Assert.IsFalse(response.Data);
            Assert.IsNotNull(response.Type);
            Assert.IsNotNull(response.Message);
            Assert.AreEqual(typeof(EasyVet.Helpers.Exceptions.EntityNotFoundException).Name, response.Type);
        }
    }
}

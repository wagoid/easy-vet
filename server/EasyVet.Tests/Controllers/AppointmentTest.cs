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
    public class AppointmentTest
    {
        private Mocks.VetContext context;
        [TestInitialize()]
        public void Initialize()
        {
            context = new Mocks.VetContext();
            var costomer = new Costumer() { Name = "teste", Email = "teste.teste", BirthDate = new DateTime(), Cpf = "0123456789", PhoneNumber = "01234568" };
            var veterinary = new Veterinary() { Name = "vet" };
            var animal = new Animal() { Name = "auau" };
            context.Costumers.Add(costomer);
            context.Veterinaries.Add(veterinary);
            context.Animals.Add(animal);
            context.SaveChanges();
        }
        [TestCleanup()]
        public void ClearDb()
        {
            context.Costumers.ToList().ForEach(a => context.Costumers.Remove(a));
            context.Veterinaries.ToList().ForEach(a => context.Veterinaries.Remove(a));
            context.Animals.ToList().ForEach(a => context.Animals.Remove(a));
            context.Appointments.ToList().ForEach(a => context.Appointments.Remove(a));
            context.SaveChanges();
        }

        [TestMethod]
        public void EnsureAllResponsePropertiesAreNull()
        {
            var controller = new EasyVet.Controllers.Appointment(context);
            assertAllResponsePropertiesAreNull<List<Appointment>, Appointment>(controller.Get());
        }

        private void assertAllResponsePropertiesAreNull<T, TEntity>(Response<T> response) where T : List<TEntity>
        {
            Assert.IsNotNull(response);
            Assert.IsNotNull(response.Data);
            Assert.AreEqual(0, response.Data.Count());
            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
        }

        [TestMethod]
        public void EnsureGetAll()
        {
            assertGetAllEmployees(context.Appointments, new EasyVet.Controllers.Appointment(context).Get);
        }

        private void assertGetAllEmployees<TEntity>(IDbSet<TEntity> collection, Func<Response<List<TEntity>>> getMethod) where TEntity : Appointment, new()
        {
            var controller = new EasyVet.Controllers.Employee(context);

            var firstCostumers = context.Costumers.First();
            var firstVeterinaries = context.Veterinaries.First();
            var firstAnimals = context.Animals.First();

            var firstEntity = new TEntity() { Animal = firstAnimals, Costumer = firstCostumers, Veterinary = firstVeterinaries, Description = "dasdas", Date = DateTime.Now };
            var secondEntity = new TEntity() { Animal = firstAnimals, Costumer = firstCostumers, Veterinary = firstVeterinaries, Description = "sdasda", Date = DateTime.Now };
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
            var controller = new EasyVet.Controllers.Appointment(context);
            context.Appointments.Add(new Appointment() { Animal = context.Animals.First(), Costumer = context.Costumers.First(), Date = DateTime.Now, Description = "dasdas", Veterinary = context.Veterinaries.First(), Name = "uhasuh"});

            context.Appointments = null;
            assertRespondsWithError(controller.Get());
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
        public void EnsureGetByIdReturns()
        {
            var controller = new EasyVet.Controllers.Appointment(context);
            assertGetByIdReturnsTheVeterinary(context.Appointments, controller.Get);
        }

        public void assertGetByIdReturnsTheVeterinary<TEntity>(IDbSet<TEntity> collection, Func<int, Response<TEntity>> findMethod)
            where TEntity : Appointment, new()
        {
            var entity = new TEntity() { Animal = context.Animals.First(), Costumer = context.Costumers.First(), Date = DateTime.Now, Description = "dasdas", Veterinary = context.Veterinaries.First(), Name = "uhasuh" };
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
            var controller = new EasyVet.Controllers.Appointment(context);
            assertNothingIsReturnedWhenIdNotFound(controller.Get);
        }
        public void assertNothingIsReturnedWhenIdNotFound<TEntity>(Func<int, Response<TEntity>> entityFindMethod)
        {
            var controller = new EasyVet.Controllers.Appointment(context);

            var response = entityFindMethod(10);

            Assert.IsNotNull(response);
            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
            Assert.IsNull(response.Data);
        }

        [TestMethod]
        public void EnsurePostCorrectlyAdds()
        {
            var controller = new EasyVet.Controllers.Appointment(context);
            assertPostCorrectlyAdds(context.Appointments, controller.Post);
        }

        private void assertPostCorrectlyAdds<TEntity>(IDbSet<TEntity> collection, Func<TEntity, Response<Models.Appointment>> postMethod)
            where TEntity : Appointment, new()
        {
            var entity = new TEntity() { Animal = context.Animals.First(), Costumer = context.Costumers.First(), Date = DateTime.Now, Description = "dasdas", Veterinary = context.Veterinaries.First(), Name = "uhasuh" };

            var response = postMethod(entity);

            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
            Assert.IsNotNull(response.Data);
            Assert.AreEqual(entity, response.Data);
        }

        [TestMethod]
        public void EnsurePutUpdatesCorrectly()
        {
            var controller = new EasyVet.Controllers.Appointment(context);
            assertPutCorrectlyUpdates(context.Appointments, controller.Put);
        }

        private void assertPutCorrectlyUpdates<TEntity>(IDbSet<TEntity> collection, Func<TEntity, Response<bool>> putMethod)
            where TEntity : Appointment, new()
        {
            var dbEntity = new TEntity() { Animal = context.Animals.First(), Costumer = context.Costumers.First(), Date = DateTime.Now, Description = "dasdas", Veterinary = context.Veterinaries.First(), Name = "uhasuh" };
            collection.Add(dbEntity);
            var entity = new TEntity() { Animal = context.Animals.First(), Costumer = context.Costumers.First(), Date = DateTime.Now, Description = "sadsad", Veterinary = context.Veterinaries.First(), Name = "uhasuh" };

            var response = putMethod(entity);

            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
            Assert.IsNotNull(response.Data);
            Assert.AreEqual(true, response.Data);
        }

        [TestMethod]
        public void EnsureVeterinaryIsDeleted()
        {
            var controller = new EasyVet.Controllers.Appointment(context);
            assertEntityDeletes(context.Appointments, controller.Delete);
        }

        private void assertEntityDeletes<TEntity>(IDbSet<TEntity> collection, Func<int, Response<bool>> deleteMethod)
            where TEntity : Appointment, new()
        {
            var entity = new TEntity() { Animal = context.Animals.First(), Costumer = context.Costumers.First(), Date = DateTime.Now, Description = "sadsad", Veterinary = context.Veterinaries.First(), Name = "uhasuh" };
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
            var controller = new EasyVet.Controllers.Appointment(context);

            assertExceptionIsThrownWhenNotFound(controller.Delete);
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

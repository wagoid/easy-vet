using System;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using EasyVet.Models;

namespace EasyVet.Tests.Controllers
{
    [TestClass]
    public class AppointmentConsultationTest
    {
        private Mocks.VetContext context;
        private Appointment appointment;
        [TestInitialize()]
        public void Initialize()
        {
            context = new Mocks.VetContext();
            var veterinary = new Veterinary() { Name = "vet", Id = 1 };
            var costomer = new Costumer() { Id = 1, Name = "teste", Email = "teste.teste", BirthDate = new DateTime(), Cpf = "0123456789", PhoneNumber = "01234568" };
            var animal = new Animal() { Name = "auau", Id = 1 };
            appointment = new Appointment() { AnimalId = 1, CostumerId = 1, Date = DateTime.Now, Name = "appointment", Description = "desc" };
            context.Costumers.Add(costomer);
            context.Veterinaries.Add(veterinary);
            context.Animals.Add(animal);
            context.Appointments.Attach(appointment);
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
        public void EnsureStartsAppointment()
        { 
        
            var previousStartDate = DateTime.Now;
            var controller = new EasyVet.Controllers.AppointmentConsultation(context);
            var result = controller.Start(appointment);
            Assert.IsTrue(previousStartDate < result.Data.StartDate);
        }

        [TestMethod]
        public void EnsureEndsAppointment()
        {
            var previousEndDate = DateTime.Now;
            var controller = new EasyVet.Controllers.AppointmentConsultation(context);
            var result = controller.End(appointment);
            Assert.IsTrue(previousEndDate < result.Data.EndDate);
        }

        [TestMethod]
        public void EnsureFindsAppointmentsFromAnimal()
        {
            var controller = new EasyVet.Controllers.AppointmentConsultation(context);

            Assert.IsTrue(controller.GetFromAnimal(1).Data.Count == 1);
        }

    }
}

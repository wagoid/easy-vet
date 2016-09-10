using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EasyVet.Enumerations;
using System.Web.Http;
using EasyVet.Helpers;
using System.Data.Entity;
using EasyVet.Controllers.Generic;
using EasyVet.Models;

namespace EasyVet.Controllers
{
    public class Appointment : Base, Interfaces.Crud<Models.Appointment>
    {
        public Appointment()
            : base()
        {

        }
        public Appointment(DAO.Interfaces.VetContext context)
            : base(context)
        {
            this.context = context;
        }

        [Route("api/appointment")]
        [HttpGet]
        public Response<IList<Models.Appointment>> Get()
        {

            return this.safelyRespond<IList<Models.Appointment>>(() =>
            {
                return this.context.Appointments
                    .Include(v => v.Costumer)
                    .Include(a => a.Animal)
                    .ToList();
            });
        }

        [Route("api/appointment/{id}")]
        [HttpGet]
        public Response<Models.Appointment> Get(int id)
        {
            return this.safelyRespond<Models.Appointment>(() =>
            {
                return this.context.Appointments
                    .Include(v => v.Costumer)
                    .Include(a => a.Animal)                    
                    .FirstOrDefault(v => v.Id == id);
            });
        }

        [Route("api/appointment/")]
        [HttpPost]
        public Response<Models.Appointment> Post([FromBody]Models.Appointment appointment)
        {
            return this.safelyRespond<Models.Appointment>(() =>
            {
                this.context.Appointments.Add(appointment);
                this.context.SaveChanges();
                return appointment;
            });
        }

        [Route("api/appointment")]
        [HttpPut]
        public Response<int> Put([FromBody]Models.Appointment appointment)
        {
            return this.safelyRespond<int>(() =>
            {
                this.context.Appointments.Attach(appointment);
                this.context.SaveChanges();
                return appointment.Id;
            });
        }

        [Route("api/appointment/{id}")]
        [HttpPut]
        public Response<bool> Delete(int id)
        {
            return this.safelyRespond<bool>(() =>
            {
                var Appointment = this.context.Appointments.FirstOrDefault(v => v.Id == id);

                if (Appointment == null)
                    throw new Helpers.Exceptions.EntityNotFoundException(String.Format("The Appointment with Id {0} was not found", id));

                this.context.Appointments.Remove(Appointment);
                this.context.SaveChanges();
                return true;
            });
        }
        [Route("api/appointment/fromveterinay/{id}")]
        [HttpGet]
        public Response<List<Models.Appointment>> GetVeterinaryAppoitment(int id)
        {
            return this.safelyRespond<List<Models.Appointment>>(() =>
            {
                return this.context.Appointments
                    .Include(v => v.Costumer)
                    .Include(a => a.Animal)
                    .Include(a => a.Veterinary)
                    .Where(a => a.Veterinary.Id == id)
                    .ToList();               
            });
        }

    }
}
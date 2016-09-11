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
    public class Appointment : Generic.Base
    {
        private DAO.Appointment appointment;
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
        public Response<List<Models.Appointment>> Get()
        {
            return safelyRespond(() => appointment.List());
        }

        [Route("api/appointment/{id}")]
        [HttpGet]
        public Response<Models.Appointment> Get(int id)
        {
            return safelyRespond(() => appointment.FindById(id));
        }

        [Route("api/appointment")]
        [HttpPost]
        public Response<Models.Appointment> Post([FromBody]Models.Appointment appointment)
        {
            return safelyRespond(() => this.appointment.Insert(appointment));
        }

        [Route("api/appointment")]
        [HttpPut]
        public Response<bool> Put([FromBody]Models.Appointment appointment)
        {
            return this.safelyRespond<bool>(() =>
            {
                var appointmentFromBd = context.Appointments.FirstOrDefault(app => app.Id == appointment.Id);
                throwEntityNotFoundWhenNull(appointmentFromBd, appointment.Id);
                return put(appointmentFromBd, appointment);
            });
        }

        [Route("api/appointment/{id}")]
        [HttpPut]
        public Response<bool> Delete(int id)
        {
            return safelyRespond<bool>(() => this.appointment.Delete(id));
        }
        [Route("api/appointment/fromveterinay/{id}")]
        [HttpGet]
        public Response<List<Models.Appointment>> GetVeterinaryAppoitment(int id)
        {
            return safelyRespond(() => appointment.GetVeterinaryAppoitment(id));
        }

    }
}
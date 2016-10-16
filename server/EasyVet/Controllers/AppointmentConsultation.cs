using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using EasyVet.Helpers;

namespace EasyVet.Controllers
{
    public class AppointmentConsultation : Generic.Base
    {
        private DAO.Appointment appointment;

        public AppointmentConsultation()
            : base()
        {
            appointment = new DAO.Appointment(context);
        }
        public AppointmentConsultation(DAO.Interfaces.VetContext context)
            : base(context)
        {
            this.context = context;
            appointment = new DAO.Appointment(this.context);
        }

        [Route("api/appointmentconsultation/start")]
        [HttpPut]
        public Response<Models.Appointment> Start([FromBody]Models.Appointment appointment)
        {
            appointment.StartDate = DateTime.Now;
            return this.safelyRespond(() => {
                this.appointment.Update(appointment);
                return appointment;
            });
        }

        [Route("api/appointmentconsultation/end")]
        [HttpPut]
        public Response<Models.Appointment> End([FromBody]Models.Appointment appointment)
        {
            appointment.EndDate = DateTime.Now;
            return this.safelyRespond(() => {
                this.appointment.Update(appointment);
                return appointment;
            });
        }

        [Route("api/appointmentconsultation/fromanimal/{id}")]
        [HttpPut]
        public Response<List<Models.Appointment>> GetFromAnimal(int id)
        {
            return this.safelyRespond(() => this.appointment.GetAnimalAppointments(id));
        }
    }
}
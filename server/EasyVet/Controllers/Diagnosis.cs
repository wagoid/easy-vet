using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EasyVet.Enumerations;
using System.Web.Http;
using EasyVet.Helpers;
using System.Data.Entity;

namespace EasyVet.Controllers
{
    public class Diagnosis : Generic.Base
    {
        private DAO.Appointment appointment;

        public Diagnosis()
            : base()
        {
            appointment = new DAO.Appointment(context);
        }

        public Diagnosis(DAO.Interfaces.VetContext context)
            : base(context)
        {
            appointment = new DAO.Appointment(context);
        }


        [HttpPut]
        [Route("api/diagnosis")]
        public Response<bool> AddDiagnostic([FromBody]Models.Appointment appointment)
        {
            return this.safelyRespond(() => {
                if (!appointment.StartDate.HasValue || (appointment.StartDate.HasValue && appointment.EndDate.HasValue))
                {
                    throw new Exception("The diagnosis can only be added if the appointment is an ongoing one.");
                }
                return this.appointment.Update(appointment);
            });
        }
    }
}
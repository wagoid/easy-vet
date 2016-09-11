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
        private DAO.Dog dog;

        public Appointment()
            : base()
        {
            appointment = new DAO.Appointment(context);
            dog = new DAO.Dog(context);
        }
        public Appointment(DAO.Interfaces.VetContext context)
            : base(context)
        {
            this.context = context;
            appointment = new DAO.Appointment(this.context);
            dog = new DAO.Dog(this.context);
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
            return safelyRespond<bool>(() => this.appointment.Update(appointment));
        }

        [Route("api/appointment/{id}")]
        [HttpPut]
        public Response<bool> Delete(int id)
        {
            return safelyRespond<bool>(() => this.appointment.Delete(id));
        }

        [Route("api/appointment/fromveterinay/{id}")]
        [HttpGet]
        public Response<List<Models.Appointment>> GetVeterinaryAppoitments(int id)
        {
            return safelyRespond(() => appointment.GetVeterinaryAppoitments(id));
        }

        [Route("api/appointment/animal/fromcostumer/{id}")]
        [HttpGet]
        public Response<List<Object>> GetCostumerAnimals(int id)
        {
            return safelyRespond(() => {
                var animals = new List<Object>();

                animals.AddRange(dog.ListFromCostumerId(id));

                return animals;
            });
        }

    }
}
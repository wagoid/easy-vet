using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Data.Entity;
using System.Web.Http;
using EasyVet.Helpers;
using EasyVet.Controllers.Generic;

namespace EasyVet.Controllers
{
    
    public class Costumer : Base, Interfaces.Crud<Models.Costumer>
    {
        public Costumer() : base()
        {
            
        }
        public Costumer(Models.Interfaces.VetContext context) : base(context)
        {
            this.context = context;
        }

        [Route("api/costumer")]
        [HttpGet]
        // GET api/costumer
        public Response<IList<Models.Costumer>> Get()
        {

            return this.safelyRespond<IList<Models.Costumer>>(() =>
            {
                return this.context.Costumers
                    .Include(v => v.Address)
                    .ToList();
            });
        }

        [Route("api/costumer/{id}")]
        [HttpGet]
        // GET api/costumer/5
        public Response<Models.Costumer> Get(int id)
        {
            return this.safelyRespond<Models.Costumer>(() =>
            {
                return this.context.Costumers
                    .Include(v => v.Address)
                    .FirstOrDefault(v => v.Id == id);
            });
        }

        [Route("api/costumer/")]
        [HttpPost]
        // POST api/costumer
        public Response<Models.Costumer> Post([FromBody]Models.Costumer costumer)
        {
            return this.safelyRespond<Models.Costumer>(() =>
            {
                this.context.Costumers.Add(costumer);
                this.context.SaveChanges();
                return costumer;
            });
        }

        [Route("api/costumer")]
        [HttpPut]
        // PUT api/costumer
        public Response<int> Put([FromBody]Models.Costumer costumer)
        {
            return this.safelyRespond<int>(() =>
            {
                this.context.Costumers.Attach(costumer);
                this.context.SaveChanges();
                return costumer.Id;
            });
        }

        [Route("api/costumer/{id}")]
        [HttpPut]
        // DELETE api/costumer/5
        public Response<bool> Delete(int id)
        {
            return this.safelyRespond<bool>(() =>
            {
                var Costumer = this.context.Costumers.FirstOrDefault(v => v.Id == id);

                if (Costumer == null)
                    throw new Helpers.Exceptions.EntityNotFoundException(String.Format("The Costumer with Id {0} was not found", id));

                this.context.Costumers.Remove(Costumer);
                this.context.SaveChanges();
                return true;
            });
        }
    }
}
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

    public class Costumer : Base
    {
        private DAO.Costumer costumer;

        public Costumer() : base()
        {
            costumer = new DAO.Costumer(this.context);
        }
        public Costumer(DAO.Interfaces.VetContext context) : base(context)
        {
            this.context = context;
            costumer = new DAO.Costumer(this.context);
        }

        [Route("api/costumer")]
        [HttpGet]
        // GET api/costumer
        public Response<List<Models.Costumer>> Get()
        {

            return safelyRespond(() => costumer.List());
        }

        [Route("api/costumer/{id}")]
        [HttpGet]
        // GET api/costumer/5
        public Response<Models.Costumer> Get(int id)
        {
            return safelyRespond(() => costumer.FindById(id));
        }

        [Route("api/costumer/")]
        [HttpPost]
        // POST api/costumer
        public Response<Models.Costumer> Post([FromBody]Models.Costumer costumer)
        {
            return safelyRespond(() => this.costumer.Insert(costumer));
        }

        [Route("api/costumer")]
        [HttpPut]
        // PUT api/costumer
        public Response<bool> Put([FromBody]Models.Costumer costumer)
        {
            return safelyRespond(() => this.costumer.Update(costumer));
        }

        [Route("api/costumer/{id}")]
        [HttpPut]
        // DELETE api/costumer/5
        public Response<bool> Delete(int id)
        {
            return safelyRespond(() => costumer.Delete(id));
        }
    }
}
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
    public class Address : BaseController
    {
        public Address() : base()
        {

        }

        public Address(Models.Interfaces.VetContext vetContext) : base(vetContext)
        {

        }

        public Response<IList<Models.Address>> Get()
        {
            return this.safelyRespond<IList<Models.Address>>(() => getList(context.Addresses));
        }

        public Response<Models.Address> Get(int id)
        {
            return this.safelyRespond<Models.Address>(() => getFirstOrDefault(this.context.Addresses, id));
        }

        public Response<int> Post([FromBody]Models.Address veterinary)
        {
            return this.safelyRespond<int>(() => post(context.Addresses, veterinary));
        }

        [Route("api/employee/veterinary")]
        [HttpPut]
        public Response<bool> Put([FromBody]Models.Address veterinary)
        {
            return this.safelyRespond<bool>(() => put(context.Addresses, veterinary));
        }

        public Response<bool> Delete(int id)
        {
            return this.safelyRespond<bool>(() => delete(context.Addresses, id));
        }
        

    }
}
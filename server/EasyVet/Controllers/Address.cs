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
    public class Address : Generic.Base
    {
        public Address() : base()
        {

        }

        public Address(DAO.Interfaces.VetContext vetContext) : base(vetContext)
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

        public Response<int> Post([FromBody]Models.Address address)
        {
            return this.safelyRespond<int>(() => post(context.Addresses, address));
        }

        [Route("api/employee/address")]
        [HttpPut]
        public Response<bool> Put([FromBody]Models.Address address)
        {
            return this.safelyRespond<bool>(() => {
                var addressFromBd = this.context.Addresses.FirstOrDefault(a => a.Id == address.Id);
                throwEntityNotFoundWhenNull(addressFromBd, address.Id);
                return put(addressFromBd, address);
            });
        }

        public Response<bool> Delete(int id)
        {
            return this.safelyRespond<bool>(() => delete(context.Addresses, id));
        }
        

    }
}
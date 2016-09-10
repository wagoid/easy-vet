using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EasyVet.Enumerations;
using System.Web.Http;
using EasyVet.Helpers;
using System.Data.Entity;
using EasyVet.Controllers.Generic;

namespace EasyVet.Controllers
{
    public class Animal : Base
    {
        public Animal() : base()
        {

        }

        public Animal(DAO.Interfaces.VetContext vetContext) : base(vetContext) {

        }

        #region Dog HTTP methods 

        [Route("api/animal/Dog")]
        [HttpGet]
        public Response<IList<Models.Dog>> Dogs()
        {
            return this.safelyRespond<IList<Models.Dog>>(() => getList(context.Dogs));
        }

        [Route("api/animal/Dog/{id}")]
        [HttpGet]
        public Response<Models.Dog> Dog(int id)
        {
            return this.safelyRespond<Models.Dog>(() => getFirstOrDefault(this.context.Dogs, id));
        }

        [Route("api/animal/Dog")]
        [HttpPost]
        public Response<int> PostDog([FromBody]Models.Dog Dog)
        {
            return this.safelyRespond<int>(() => post(context.Dogs, Dog));
        }

        [Route("api/animal/Dog")]
        [HttpPut]
        public Response<bool> PutDog([FromBody]Models.Dog dog)
        {
            return this.safelyRespond<bool>(() => {
                var dogFromBd = context.Dogs.FirstOrDefault(d => d.Id == dog.Id);
                throwEntityNotFoundWhenNull(dogFromBd, dog.Id);
                return put(dogFromBd, dog);
            });
        }

        [Route("api/animal/Dog/{id}")]
        [HttpPut]
        public Response<bool> DeleteDog(int id)
        {
            return this.safelyRespond<bool>(() => delete(context.Dogs, id));
        }

        #endregion

        #region All animal Types HTTP methods

        [Route("api/animal/all")]
        [HttpGet]
        public Response<IList<Object>> All()
        {
            return safelyRespond <IList<Object>>(() =>
              {
                  var animals = new List<Object>();

                  animals.AddRange(getList(context.Dogs));

                  return animals;
              });
        }

        #endregion

    }
}
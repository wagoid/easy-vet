using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace EasyVet.DAO
{
    public class Dog : Generic.Base
    {
        public Dog() : base()
        {

        }

        public Dog(Interfaces.VetContext context) : base(context)
        {

        }

        public List<Models.Dog> List()
        {
            return getList(this.context.Dogs);
        }

        public List<Models.Dog> ListFromCostumerId(int costumerId)
        {
            
            return this.context.Dogs
                    .Include(dog => dog.Owner)
                    .Where(dog => dog.Owner.Id == costumerId)
                    .ToList();
        }

        public Models.Dog FindById(int id)
        {
            return getFirstOrDefault(this.context.Dogs, id);
        }

        public Models.Dog Insert(Models.Dog dog)
        {
            return post(this.context.Dogs, dog);
        }

        public bool Update(Models.Dog dog)
        {
            var dogFromBd = context.Dogs.FirstOrDefault(d => d.Id == dog.Id);
            throwEntityNotFoundWhenNull(dogFromBd, dog.Id);
            return put(dogFromBd, dog);
        }

        public bool Delete(int id)
        {
            return delete(this.context.Dogs, id);
        }
    }
}
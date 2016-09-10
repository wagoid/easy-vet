using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasyVet.DAO
{
    public class Costumer : Generic.Base
    {
        public Costumer() : base()
        {

        }

        public Costumer(Interfaces.VetContext context) : base(context)
        {

        }
        public List<Models.Costumer> List()
        {
            return getList(this.context.Costumers);
        }

        public Models.Costumer FindById(int id)
        {
            return getFirstOrDefault(this.context.Costumers, id);
        }

        public int Insert(Models.Costumer costumer)
        {
            return post(this.context.Costumers, costumer);
        }

        public bool Update(Models.Costumer costumer)
        {
            var costumerFromBd = context.Costumers.FirstOrDefault(d => d.Id == costumer.Id);
            throwEntityNotFoundWhenNull(costumerFromBd, costumer.Id);
            return put(costumerFromBd, costumer);
        }

        public bool Delete(int id)
        {
            return delete(this.context.Costumers, id);
        }
    }
}
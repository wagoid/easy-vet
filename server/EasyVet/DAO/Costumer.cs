using EasyVet.Helpers;
using System;
using System.Collections.Generic;
using System.Data.Entity;
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
            return this.context.Costumers
                .Include(c => c.Address)
                .ToList();
        }

        public Models.Costumer FindById(int id)
        {
            return getFirstOrDefault(this.context.Costumers, id);
        }

        public Models.Costumer Insert(Models.Costumer costumer)
        {
            costumer.Password = Encoder.Encode(costumer.Password);
            this.context.Costumers.Add(costumer);
            this.context.SaveChanges();
            return costumer;
        }

        public bool Update(Models.Costumer costumer)
        {
            var costumerFromBd = context.Costumers.FirstOrDefault(d => d.Id == costumer.Id);
            throwEntityNotFoundWhenNull(costumerFromBd, costumer.Id);
            var newPassword = Encoder.Encode(costumer.Password);
            if (costumerFromBd.Password != newPassword)
                costumer.Password = newPassword;
            else
                costumer.Password = costumerFromBd.Password;
            context.Entry(costumerFromBd).CurrentValues.SetValues(costumer);
            context.Entry(costumerFromBd).State = EntityState.Modified;
            context.SaveChanges();
            return true;
        }

        public bool Delete(int id)
        {
            return delete(this.context.Costumers, id);
        }
    }
}
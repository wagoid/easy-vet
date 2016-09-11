using EasyVet.Helpers;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace EasyVet.DAO.Generic
{
    public class Employee : Base
    {
        public Employee() : base()
        {

        }
        public Employee(Interfaces.VetContext vetContext) : base(vetContext)
        {

        }
        protected List<TEntity> getEmployeeList<TEntity>(IDbSet<TEntity> entityDbSet) where TEntity : Models.Employee
        {
            return entityDbSet
                    .Include(entity => entity.Address)
                    .ToList();
        }
        protected TEntity getEmployeeFirstOrDefault<TEntity>(IDbSet<TEntity> entityDbSet, int id) where TEntity : Models.Employee
        {
            return entityDbSet
                .Include(entity => entity.Address)
                .FirstOrDefault();
        }
        protected TEntity postEmployee<TEntity>(IDbSet<TEntity> entityDbSet, TEntity entity) where TEntity : Models.Employee
        {
            entityDbSet.Add(entity);
            context.SaveChanges();
            return entity;
        }

        protected bool putEmployee<TEntity>(IDbSet<TEntity> collection, TEntity entity) where TEntity : Models.Employee
        {
            var entityFromBd = collection.FirstOrDefault(d => d.Id == entity.Id);
            throwEntityNotFoundWhenNull(entityFromBd, entity.Id);
            updatePasswordWhenChanged(entityFromBd, entity);
            context.Entry(entityFromBd).CurrentValues.SetValues(entity);
            context.Entry(entityFromBd).State = EntityState.Modified;
            context.SaveChanges();
            return true;
        }

        protected void updatePasswordWhenChanged<TEntity>(TEntity entityFromBd, TEntity entityFromClient) where TEntity : Models.User
        {
            var newPassword = Encoder.Encode(entityFromClient.Password);
            if (entityFromBd.Password != newPassword)
                entityFromClient.Password = newPassword;
            else
                entityFromClient.Password = entityFromBd.Password;
        }
    }
}
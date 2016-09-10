using EasyVet.Helpers;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace EasyVet.Controllers.Generic
{
    public class User : Base
    {
        public User() : base()
        {

        }
        public User(DAO.Interfaces.VetContext vetContext) : base(vetContext) {

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
        protected int postEmployee<TEntity>(IDbSet<TEntity> entityDbSet, TEntity entity) where TEntity : Models.Employee
        {
            entityDbSet.Add(entity);
            context.SaveChanges();
            return entity.Id;
        }

        protected bool putEmployee<TEntity>(TEntity entityFromBd, TEntity entity) where TEntity : Models.Employee
        {
            context.Entry(entityFromBd).CurrentValues.SetValues(entity);
            context.Entry(entityFromBd).State = EntityState.Modified;
            context.SaveChanges();
            return true;
        }
        protected bool deleteEmployee<TEntity>(IDbSet<TEntity> entityDbSet, int id) where TEntity : Models.Employee
        {
            var entity = entityDbSet.FirstOrDefault(e => e.Id == id);
            throwEntityNotFoundWhenNull(entity, id);

            entityDbSet.Remove(entity);
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
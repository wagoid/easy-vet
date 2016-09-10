using EasyVet.DAO;
using EasyVet.Helpers;
using EasyVet.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EasyVet.DAO.Generic
{
    public class Base
    {
        protected Interfaces.VetContext context;

        public Base()
        {
            this.context = new VetContext();
        }

        public Base(Interfaces.VetContext context)
        {
            this.context = context;
        }

        protected List<TEntity> getList<TEntity>(IDbSet<TEntity> entityDbSet) where TEntity : class
        {
            return entityDbSet
                    .ToList();
        }

        protected TEntity getFirstOrDefault<TEntity>(IDbSet<TEntity> entityDbSet, int id) where TEntity : Models.BaseEntity
        {
            return entityDbSet
                .FirstOrDefault(entity => entity.Id == id);
        }

        protected int post<TEntity>(IDbSet<TEntity> entityDbSet, TEntity entity) where TEntity : BaseEntity
        {
            entityDbSet.Add(entity);
            context.SaveChanges();
            return entity.Id;
        }

        protected bool put<TEntity>(TEntity entityFromBd, TEntity entity) where TEntity : BaseEntity
        {
            context.Entry(entityFromBd).CurrentValues.SetValues(entity);
            context.Entry(entityFromBd).State = EntityState.Modified;
            context.SaveChanges();
            return true;
        }

        protected bool delete<TEntity>(IDbSet<TEntity> entityDbSet, int id) where TEntity : BaseEntity
        {
            var entity = entityDbSet.FirstOrDefault(e => e.Id == id);
            throwEntityNotFoundWhenNull(entity, id);

            entityDbSet.Remove(entity);
            context.SaveChanges();
            return true;
        }

        protected void throwEntityNotFoundWhenNull<TEntity>(TEntity entity, int id) where TEntity : class
        {
            if (entity == null)
            {
                throw new Helpers.Exceptions.EntityNotFoundException(String.Format("The {0} with Id {0} was not found", nameof(entity), id));
            }
        }

    }
}
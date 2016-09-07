using EasyVet.Helpers;
using EasyVet.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EasyVet.Controllers.Generic
{
    public class Base : ApiController
    {
        protected Models.Interfaces.VetContext context;
        protected ResponseHandler responseHandler;

        public Base()
        {
            this.context = new VetContext();
            this.responseHandler = new ResponseHandler();
        }

        public Base(Models.Interfaces.VetContext context)
        {
            this.context = context;
            this.responseHandler = new ResponseHandler();
        }

        protected Response<T> safelyRespond<T>(Func<T> func)
        {
            try
            {
                return this.responseHandler.Data<T>(func());
            }
            catch (Exception e)
            {
                return this.responseHandler.Error<T>(e);
            }
        }

        protected List<TEntity> getList<TEntity>(IDbSet<TEntity> entityDbSet) where TEntity : class
        {
            return entityDbSet
                    .ToList();
        }
        protected TEntity getFirstOrDefault<TEntity>(IDbSet<TEntity> entityDbSet, int id) where TEntity : class
        {
            return entityDbSet
                .FirstOrDefault();
        }
        protected int post<TEntity>(IDbSet<TEntity> entityDbSet, TEntity entity) where TEntity : BaseEntity
        {
            entityDbSet.Add(entity);
            context.SaveChanges();
            return entity.Id;
        }

        protected bool put<TEntity>(IDbSet<TEntity> entityDbSet, TEntity entity) where TEntity : BaseEntity
        {
            entityDbSet.Attach(entity);
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
using EasyVet.Helpers;
using EasyVet.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EasyVet.Controllers
{
    public class BaseController : ApiController
    {
        protected Models.Interfaces.VetContext context;
        protected ResponseHandler responseHandler;

        public BaseController()
        {
            this.context = new VetContext();
            this.responseHandler = new ResponseHandler();
        }

        public BaseController(Models.Interfaces.VetContext context)
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

        protected bool putEmployee<TEntity>(IDbSet<TEntity> entityDbSet, TEntity entity) where TEntity : Models.Employee
        {
            entityDbSet.Attach(entity);
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
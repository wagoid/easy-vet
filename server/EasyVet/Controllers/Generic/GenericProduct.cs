using EasyVet.Helpers;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace EasyVet.Controllers.Generic
{
    public class GenericProduct : Base
    {
        public GenericProduct()
            : base()
        {

        }
        public GenericProduct(DAO.Interfaces.VetContext vetContext)
            : base(vetContext)
        {

        }

        protected List<TEntity> getProductList<TEntity>(IDbSet<TEntity> entityDbSet) where TEntity : Models.Product
        {
            return entityDbSet
                    .ToList();
        }

        protected TEntity getProductFirstOrDefault<TEntity>(IDbSet<TEntity> entityDbSet, int id) where TEntity : Models.Product
        {
            return entityDbSet
                .FirstOrDefault();
        }

        protected TEntity postProducts<TEntity>(IDbSet<TEntity> entityDbSet, TEntity entity) where TEntity : Models.Product
        {
            entityDbSet.Add(entity);
            context.SaveChanges();
            return entity;
        }

        protected bool putProduct<TEntity>(TEntity entityFromBd, TEntity entity) where TEntity : Models.Product
        {
            context.Entry(entityFromBd).CurrentValues.SetValues(entity);
            context.Entry(entityFromBd).State = EntityState.Modified;
            context.SaveChanges();
            return true;
        }

        protected bool deleteProduct<TEntity>(IDbSet<TEntity> entityDbSet, int id) where TEntity : Models.Product
        {
            var entity = entityDbSet.FirstOrDefault(e => e.Id == id);
            throwEntityNotFoundWhenNull(entity, id);

            entityDbSet.Remove(entity);
            context.SaveChanges();
            return true;
        }

        protected List<TEntity> getSaleList<TEntity>(IDbSet<TEntity> entityDbSet) where TEntity : Models.Sale
        {
            return entityDbSet
                    .Include(entity => entity.SaleProducts)
                    .ToList();
        }

        protected bool deleteSale<TEntity>(IDbSet<TEntity> entityDbSet, int id) where TEntity : Models.Sale
        {
            var entity = entityDbSet.FirstOrDefault(e => e.Id == id);
            throwEntityNotFoundWhenNull(entity, id);
            entityDbSet.Remove(entity);
            context.SaveChanges();
            return true;
        }

        protected bool putSale<TEntity>(TEntity entityFromBd, TEntity entity) where TEntity : Models.Sale
        {
            context.Entry(entityFromBd).CurrentValues.SetValues(entity);
            context.Entry(entityFromBd).State = EntityState.Modified;
            context.SaveChanges();
            return true;
        }

        protected TEntity postSales<TEntity>(IDbSet<TEntity> entityDbSet, TEntity entity) where TEntity : Models.Sale
        {
            entityDbSet.Add(entity);
            context.SaveChanges();
            return entity;
        }


        protected TEntity getSaleFirstOrDefault<TEntity>(IDbSet<TEntity> entityDbSet, int id) where TEntity : Models.Sale
        {
            return entityDbSet
                .FirstOrDefault();
        }
    }
}
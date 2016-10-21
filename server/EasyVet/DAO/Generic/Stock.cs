using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using EasyVet.Helpers;
using System.Web;

namespace EasyVet.DAO.Generic
{
    public class Stock : Base
    {

        public Stock() : base()
        {

        }

        public Stock(Interfaces.VetContext vetContext) : base(vetContext)
        {

        }

        protected TEntity postStock<TEntity>(IDbSet<TEntity> entityDbSet, TEntity entity) where TEntity : Models.Stock
        {
            entityDbSet.Add(entity);
            context.SaveChanges();
            return entity;
        }
    }
}
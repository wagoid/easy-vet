using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyVet.Tests.Mocks
{
    class DbSet<TEntity> : IDbSet<TEntity>
         where TEntity : class
    {
        ObservableCollection<TEntity> data;
        IQueryable query;

        public DbSet()
        {
            data = new ObservableCollection<TEntity>();
            query = data.AsQueryable();
        }

        public virtual TEntity Find(params object[] keyValues)
        {
            throw new NotImplementedException("Derive from FakeDbSet<TEntity> and override Find");
        }

        public TEntity Add(TEntity item)
        {
            data.Add(item);
            return item;
        }

        public TEntity Remove(TEntity item)
        {
            data.Remove(item);
            return item;
        }

        public TEntity Attach(TEntity item)
        {
            data.Add(item);
            return item;
        }

        public TEntity Detach(TEntity item)
        {
            data.Remove(item);
            return item;
        }

        public TEntity Create()
        {
            return Activator.CreateInstance<TEntity>();
        }

        public TDerivedEntity Create<TDerivedEntity>() where TDerivedEntity : class, TEntity
        {
            return Activator.CreateInstance<TDerivedEntity>();
        }

        public List<TEntity> ToList()
        {
            return data.ToList();
        }

        public ObservableCollection<TEntity> Local
        {
            get { return data; }
        }

        Type IQueryable.ElementType
        {
            get { return query.ElementType; }
        }

        System.Linq.Expressions.Expression IQueryable.Expression
        {
            get { return query.Expression; }
        }

        IQueryProvider IQueryable.Provider
        {
            get { return query.Provider; }
        }

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return data.GetEnumerator();
        }

        IEnumerator<TEntity> IEnumerable<TEntity>.GetEnumerator()
        {
            return data.GetEnumerator();
        }
    }
}

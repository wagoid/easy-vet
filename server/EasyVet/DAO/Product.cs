using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasyVet.DAO
{
    public class Product : Generic.Base
    {
        public Product() : base()
        {

        }

        public Product(Interfaces.VetContext context) : base(context)
        {

        }

        public List<Models.Product> List()
        {
            return getList(this.context.Products);
        }

        public Models.Product FindById(int id)
        {
            return getFirstOrDefault(this.context.Products, id);
        }

        public Models.Product Insert(Models.Product product)
        {
            return post(this.context.Products, product);
        }

        public bool Update(Models.Product product)
        {
            var productFromBd = this.context.Products.FirstOrDefault(p => p.Id == product.Id);
            throwEntityNotFoundWhenNull(productFromBd, product.Id);
            return put(productFromBd, product);
        }

        public bool Delete(int id)
        {
            return delete(this.context.Products, id);
        }

    }
}
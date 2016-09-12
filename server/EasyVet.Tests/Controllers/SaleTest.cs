using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using EasyVet;
using EasyVet.Helpers;
using EasyVet.Models;
using System.Data.Entity;

namespace EasyVet.Tests.Controllers
{
    [TestClass]
    public class SaleTest
    {
        private Mocks.VetContext context;
        [TestInitialize()]
        public void Initialize()
        {
            context = new Mocks.VetContext();

            var product = new Product() { Name = "Ração", Description = "Ração pets filhotes", Price = 30 };

            var saleProduct = new SaleProduct() { Product = product };

            var sale = new Sale()
            {
                Costumer = new Costumer() { Name = "joao Carlos", BirthDate = DateTime.Now, Cpf = "0123456789", Email = "teste@teste.teste.br", PhoneNumber = "33441155" },
                Value = 360
            };

            sale.SaleProducts.Add(saleProduct);
            saleProduct.Sale = sale;

            context.Products.Add(product);
            context.SaleProducts.Add(saleProduct);
            context.Sales.Add(sale);
            context.SaveChanges();
        }
        [TestCleanup()]
        public void ClearDb()
        {
            context.Products.ToList().ForEach(a => context.Products.Remove(a));
            context.SaleProducts.ToList().ForEach(a => context.SaleProducts.Remove(a));
            context.Sales.ToList().ForEach(a => context.Sales.Remove(a));
            context.SaveChanges();
        }

        [TestMethod]
        public void EnsureAllResponsePropertiesAreNull()
        {
            var controller = new EasyVet.Controllers.Sale(context);
            var response = controller.All();

            assertAllResponsePropertiesAreNull<IList<Object>, Object>(controller.All());
            assertAllResponsePropertiesAreNull<IList<Object>, Object>(controller.All());
            assertAllResponsePropertiesAreNull<IList<Product>, Product>(controller.Product());
        }

        private void assertAllResponsePropertiesAreNull<T, TEntity>(Response<T> response) where T : IList<TEntity>
        {
            Assert.IsNotNull(response);
            Assert.IsNotNull(response.Data);
            Assert.AreEqual(0, response.Data.Count());
            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
        }

        /*
        [TestMethod]
        public void EnsureGetAllProducts()
        {
            assertGetAllProducts(context.Products, new EasyVet.Controllers.Sale(context).Product);
        }

        private void assertGetAllProducts<TEntity>(IDbSet<TEntity> collection, Func<Response<IList<TEntity>>> getMethod) where TEntity : Sale, new()
        {
            var firstEntity = new TEntity() { Name = "teste 1", Description = "1", Price = 10 };
            var secondEntity = new TEntity() { Name = "teste 2 ", Description = "2", Price = 20 };
            collection.Add(firstEntity);
            collection.Add(secondEntity);
            context.SaveChanges();

            var response = getMethod();

            Assert.IsNotNull(response);
            Assert.IsNotNull(response.Data);
            Assert.AreEqual(2, response.Data.Count());
            Assert.AreEqual(firstEntity, response.Data[0]);
            Assert.AreEqual(secondEntity, response.Data[1]);
            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
        }

        [TestMethod]
        public void EnsureRespondsWithError()
        {
            var controller = new EasyVet.Controllers.Sale(context);
            context.Products.Add(new Product() { Name = "teste", Price = 30, Description = "Adulto" });

            context.Products = null;
            assertRespondsWithError(controller.Product());
        }

        private void assertRespondsWithError<T>(Response<T> response)
        {
            Assert.IsNotNull(response);
            Assert.IsNull(response.Data);
            Assert.IsNotNull(response.Message);
            Assert.IsNotNull(response.Type);
            Assert.AreEqual("ArgumentNullException", response.Type);
        }*/

        [TestMethod]
        public void EnsureNothingIsReturnedWhenIdNotFound()
        {
            var controller = new EasyVet.Controllers.Sale(context);
            assertNothingIsReturnedWhenIdNotFound(controller.Product);
        }
        public void assertNothingIsReturnedWhenIdNotFound<TEntity>(Func<int, Response<TEntity>> entityFindMethod)
        {
            var controller = new EasyVet.Controllers.Sale(context);

            var response = entityFindMethod(10);

            Assert.IsNotNull(response);
            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
            Assert.IsNull(response.Data);
        }

        [TestMethod]
        public void EnsurePostCorrectlyAdds()
        {
            var controller = new EasyVet.Controllers.Sale(context);
            assertPostCorrectlyAdds(context.Products, controller.PostProduct);
        }

        private void assertPostCorrectlyAdds<TEntity>(IDbSet<TEntity> collection, Func<TEntity, Response<Models.Product>> postMethod)
            where TEntity : Product, new()
        {
            var product = new TEntity() { Name = "teste", Description = "Adulto", Price = 30  };

            var response = postMethod(product);

            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
            Assert.IsNotNull(response.Data);
            Assert.AreEqual(product.Id, response.Data);
        }

        [TestMethod]
        public void EnsurePutUpdatesCorrectly()
        {
            var controller = new EasyVet.Controllers.Sale(context);
            assertPutCorrectlyUpdates(context.Products, controller.put);
        }

        private void assertPutCorrectlyUpdates<TEntity>(IDbSet<TEntity> collection, Func<TEntity, Response<bool>> putMethod)
            where TEntity : Product, new()
        {
            var dbEntity = new TEntity() { Name = "teste 1", Description = "Adulto", Price = 30 };
            collection.Add(dbEntity);
            var entity = new TEntity() { Id = 1, Name = "Teste 2", Description = "filhotes", Price = 40 };

            var response = putMethod(entity);

            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
            Assert.IsNotNull(response.Data);
            Assert.AreEqual(true, response.Data);
        }

        [TestMethod]
        public void EnsureSaleIsDeleted()
        {
            var controller = new EasyVet.Controllers.Sale(context);
            assertEntityDeletes(context.Products, controller.DeleteProduct);
        }

        private void assertEntityDeletes<TEntity>(IDbSet<TEntity> collection, Func<int, Response<bool>> deleteMethod)
            where TEntity : Product, new()
        {
            var entity = new TEntity() { Name = "teste", Price = 30, Description = "Teste" };
            collection.Add(entity);
            context.SaveChanges();

            var response = deleteMethod(entity.Id);

            Assert.IsTrue(response.Data);
            Assert.IsNull(response.Type);
            Assert.IsNull(response.Message);
        }

        [TestMethod]
        public void EnsureExceptionIsThrownWhenNotFound()
        {
            var controller = new EasyVet.Controllers.Sale(context);

            assertExceptionIsThrownWhenNotFound(controller.DeleteProduct);
        }

        private void assertExceptionIsThrownWhenNotFound(Func<int, Response<bool>> deleteMethod)
        {
            var response = deleteMethod(321323123);

            Assert.IsFalse(response.Data);
            Assert.IsNotNull(response.Type);
            Assert.IsNotNull(response.Message);
            Assert.AreEqual(typeof(EasyVet.Helpers.Exceptions.EntityNotFoundException).Name, response.Type);
        }
    }
}

using EasyVet.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace EasyVet.Controllers.Interfaces
{
    interface Crud<TEntity>
    {
        // GET api/{controller}
        Response<IList<TEntity>> Get();
        // GET api/{controller}/{id}
        Response<TEntity> Get(int id);
        // POST api/{controller}
        Response<TEntity> Post([FromBody]TEntity entity);
        // PUT api/{controller}
        Response<int> Put([FromBody] TEntity entity);
        // DELETE api/{controller/{id}
        Response<bool> Delete(int id);
    }
}

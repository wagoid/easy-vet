using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Data.Entity;
using System.Web.Http;
using EasyVet.Helpers;

namespace EasyVet.Controllers
{
    
    public class Veterinary : BaseController, Interfaces.Crud<Models.Veterinary>
    {
        public Veterinary() : base()
        {
            
        }
        public Veterinary(Models.Interfaces.VetContext context) : base(context)
        {
            this.context = context;
        }

        // GET api/veterinary
        public Response<IList<Models.Veterinary>> Get()
        {

            return this.safeExecute<IList<Models.Veterinary>>(() =>
            {
                return this.context.Veterinaries
                    .Include(v => v.Address)
                    .ToList();
            });
        }

        // GET api/veterinary/5
        public Response<Models.Veterinary> Get(int id)
        {
            return this.safeExecute<Models.Veterinary>(() =>
            {
                return this.context.Veterinaries
                    .Include(v => v.Address)
                    .FirstOrDefault(v => v.Id == id);
            });
        }

        // POST api/veterinary
        public Response<Models.Veterinary> Post([FromBody]Models.Veterinary veterinary)
        {
            return this.safeExecute<Models.Veterinary>(() =>
            {
                this.context.Veterinaries.Add(veterinary);
                this.context.SaveChanges();
                return veterinary;
            });
        }

        // PUT api/veterinary
        public Response<int> Put([FromBody]Models.Veterinary veterinary)
        {
            return this.safeExecute<int>(() =>
            {
                this.context.Veterinaries.Attach(veterinary);
                this.context.SaveChanges();
                return veterinary.Id;
            });
        }

        // DELETE api/veterinary/5
        public Response<bool> Delete(int id)
        {
            return this.safeExecute<bool>(() =>
            {
                var veterinary = this.context.Veterinaries.FirstOrDefault(v => v.Id == id);

                if (veterinary == null)
                    throw new Helpers.Exceptions.EntityNotFoundException(String.Format("The Veterinary with Id {0} was not found", id));

                this.context.Veterinaries.Remove(veterinary);
                this.context.SaveChanges();
                return true;
            });
        }
    }
}

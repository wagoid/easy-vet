using EasyVet.Helpers;
using EasyVet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

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

       

        protected Response<T> safeExecute<T>(Func<T> func)
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
    }
}
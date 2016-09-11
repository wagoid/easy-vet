using EasyVet.DAO;
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
        protected DAO.Interfaces.VetContext context;
        protected ResponseHandler responseHandler;

        public Base()
        {
            this.context = new VetContext();
            this.responseHandler = new ResponseHandler();
        }

        public Base(DAO.Interfaces.VetContext context)
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

    }
}
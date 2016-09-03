﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;

namespace EasyVet.App_Start
{
    public class CorsFilter : ActionFilterAttribute
    {
        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            actionExecutedContext.Response.Content.Headers.Add("Access-Control-Allow-Origin", "*");
        }

    }
}
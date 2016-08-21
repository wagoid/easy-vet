using System.Web.Http;
using System.Net.Http.Headers;
using System.Web.Http.Dispatcher;
using System.Reflection;
using System;
using System.Web.Http.Controllers;

namespace EasyVet
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //Use
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

            // Web API routes
            config.MapHttpAttributeRoutes();

            changeConfigToStopUsingControllerSuffix(config);

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }

        private static void changeConfigToStopUsingControllerSuffix(HttpConfiguration config)
        {
            config.Services.Replace(typeof(IHttpControllerTypeResolver), new CustomHttpControllerTypeResolver());

            var suffix = typeof(DefaultHttpControllerSelector).GetField("ControllerSuffix", BindingFlags.Static | BindingFlags.Public);
            if (suffix != null) suffix.SetValue(null, string.Empty);
        }
    }

    public class CustomHttpControllerTypeResolver : DefaultHttpControllerTypeResolver
    {
        public CustomHttpControllerTypeResolver()
                : base(IsHttpEndpoint)
        { }

        internal static bool IsHttpEndpoint(Type t)
        {
            if (t == null) throw new ArgumentNullException("t");

            return t.IsClass && t.IsVisible && !t.IsAbstract && typeof(ApiController).IsAssignableFrom(t) && typeof(IHttpController).IsAssignableFrom(t);
        }
    }
}

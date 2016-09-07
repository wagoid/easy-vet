using EasyVet.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace EasyVet.App_Start
{
    public class AuthenticationHandler : DelegatingHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            if (isLoginRoute(request.RequestUri.AbsolutePath))
                return base.SendAsync(request, cancellationToken);

            var authorizationToken = HttpContext.Current.Request.Headers["Authorization"];
            var decryptedToken = Crypto.DecryptString(authorizationToken);
            var tokenParts = decryptedToken.Split('|');
            if (tokenParts.Length == 3)
            {
                var tokenDate = DateTime.Parse(tokenParts[1]);
                var expirationTime = int.Parse(tokenParts[2]);

                if (tokenDate.AddSeconds(expirationTime) >= DateTime.Now)
                    return base.SendAsync(request, cancellationToken);
            }

            var unauthorizedResponseMessage = new HttpResponseMessage(HttpStatusCode.Unauthorized) { ReasonPhrase = "Authorization token invalid or expired!" };
            throw new HttpResponseException(unauthorizedResponseMessage);
        }

        protected bool isLoginRoute(string requestAbsolutePath)
        {
            return requestAbsolutePath.EndsWith("api/auth/login");
        }
    }
}
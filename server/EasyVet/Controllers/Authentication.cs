using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EasyVet.Enumerations;
using System.Web.Http;
using EasyVet.Helpers;
using System.Data.Entity;

namespace EasyVet.Controllers
{
    public class Authentication : Generic.Base
    {
        private const int oneWeekInSeconds = 604800;
        public Authentication() : base()
        {

        }

        public Authentication(Models.Interfaces.VetContext vetContext) : base(vetContext)
        {

        }

        [Route("api/auth/login")]
        [HttpPost]
        public Response<object> Login([FromBody] Models.User userInfo)
        {
            return this.safelyRespond<object>(() => {
                var dbUser = context.Users.FirstOrDefault(user => user.Cpf == userInfo.Cpf);

                if (dbUser == null)
                {
                    throw new Helpers.Exceptions.EntityNotFoundException("User was not found");
                }

                var encodedPassword = Encoder.Encode(userInfo.Password);
                string authToken = null;
                if (dbUser.Password == encodedPassword)
                {
                    authToken = Crypto.EncryptString(string.Format("{0}|{1}|{2}", dbUser.Id, DateTime.Now, oneWeekInSeconds));
                } else
                {
                    throw new Helpers.Exceptions.InvalidPasswordException("User password is not valid");
                }

                //Omit password from client
                dbUser.Password = null;

                return new
                {
                    user = dbUser,
                    authToken
                };
            });
        }

        

    }
}
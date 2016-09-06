﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EasyVet.Enumerations;
using System.Web.Http;
using EasyVet.Helpers;
using System.Data.Entity;

namespace EasyVet.Controllers
{
    public class Authentication : BaseController
    {
        public Authentication() : base()
        {

        }

        public Authentication(Models.Interfaces.VetContext vetContext) : base(vetContext)
        {

        }

        [Route("api/auth/login")]
        [HttpPost]
        public Response<Models.User> Login([FromBody] Models.User userInfo)
        {
            return this.safelyRespond<Models.User>(() => {
                var dbUser = context.Users.FirstOrDefault(user => user.Cpf == userInfo.Cpf);

                if (dbUser == null)
                {
                    throw new Helpers.Exceptions.EntityNotFoundException("User was not found");
                }

                var encodedPassword = PasswordEncoder.EncodePassword(userInfo.Password);

                if (dbUser.Password == encodedPassword)
                {
                    dbUser.Password = encodedPassword;
                } else
                {
                    throw new Helpers.Exceptions.InvalidPasswordException("User password is not valid");
                }


                return dbUser;
            });
        }

        

    }
}
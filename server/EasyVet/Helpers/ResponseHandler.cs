using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasyVet.Helpers
{
    public class Response<T>
    {
        public string Type { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
    }
    public class ResponseHandler
    {
        public Response<T> Error<T>(Exception e)
        {
            return new Response<T>()
            {
                Type = e.GetType().Name,
                Message = e.Message
            };
        }

        public Response<T> Data<T>(T data)
        {
            return new Response<T>()
            {
                Data = data
            };
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace EasyVet.Helpers
{
    public class Encoder
    {
        public static string Encode(string password, string salt = "easy-vet-salt-42")
        {
            byte[] bytes = Encoding.Unicode.GetBytes(password);
            byte[] src = Encoding.Unicode.GetBytes(salt);
            byte[] dst = new byte[src.Length + bytes.Length];

            Buffer.BlockCopy(src, 0, dst, 0, src.Length);
            Buffer.BlockCopy(bytes, 0, dst, src.Length, bytes.Length);

            HashAlgorithm algorithm = HashAlgorithm.Create("SHA256");
            byte[] inarray = algorithm.ComputeHash(dst);

            return Convert.ToBase64String(inarray);
        }

    }


}
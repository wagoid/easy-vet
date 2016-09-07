using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace EasyVet.Helpers
{
    public class Crypto
    {
        private static byte[] _salt = Encoding.ASCII.GetBytes("o6806642kbM7c5");

        public static string EncryptString(string plainText, string sharedSecret = "easy-vet-6x9=42")
        {
            if (string.IsNullOrEmpty(plainText))
                throw new ArgumentNullException("plainText");
            if (string.IsNullOrEmpty(sharedSecret))
                throw new ArgumentNullException("sharedSecret");

            string outputString = null;
            RijndaelManaged rijndaelManaged = null;

            try
            {
                Rfc2898DeriveBytes key = new Rfc2898DeriveBytes(sharedSecret, _salt);

                // Create a RijndaelManaged object
                rijndaelManaged = new RijndaelManaged();
                rijndaelManaged.Key = key.GetBytes(rijndaelManaged.KeySize / 8);

                // Create a decryptor to perform the stream transform.
                ICryptoTransform encryptor = rijndaelManaged.CreateEncryptor(rijndaelManaged.Key, rijndaelManaged.IV);

                // Create the streams used for encryption.
                using (MemoryStream msEncrypt = new MemoryStream())
                {
                    // prepend the IV
                    msEncrypt.Write(BitConverter.GetBytes(rijndaelManaged.IV.Length), 0, sizeof(int));
                    msEncrypt.Write(rijndaelManaged.IV, 0, rijndaelManaged.IV.Length);
                    using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                        {
                            //Write all data to the stream.
                            swEncrypt.Write(plainText);
                        }
                    }
                    outputString = Convert.ToBase64String(msEncrypt.ToArray());
                }
            }
            finally
            {
                if (rijndaelManaged != null)
                    rijndaelManaged.Clear();
            }

            return outputString;
        }

        public static string DecryptString(string cipherText, string sharedSecret = "easy-vet-6x9=42")
        {
            if (string.IsNullOrEmpty(cipherText))
                throw new ArgumentNullException("cipherText");
            if (string.IsNullOrEmpty(sharedSecret))
                throw new ArgumentNullException("sharedSecret");

            RijndaelManaged rijndaelManaged = null;

            string plaintext = null;

            try
            {
                Rfc2898DeriveBytes key = new Rfc2898DeriveBytes(sharedSecret, _salt);

                // Create the streams used for decryption.                
                byte[] bytes = Convert.FromBase64String(cipherText);
                using (MemoryStream msDecrypt = new MemoryStream(bytes))
                {
                    // Create a RijndaelManaged object
                    // with the specified key and IV.
                    rijndaelManaged = new RijndaelManaged();
                    rijndaelManaged.Key = key.GetBytes(rijndaelManaged.KeySize / 8);
                    // Get the initialization vector from the encrypted stream
                    rijndaelManaged.IV = ReadByteArray(msDecrypt);
                    // Create a decrytor to perform the stream transform.
                    ICryptoTransform decryptor = rijndaelManaged.CreateDecryptor(rijndaelManaged.Key, rijndaelManaged.IV);
                    using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader srDecrypt = new StreamReader(csDecrypt))

                            // Read the decrypted bytes from the decrypting stream
                            // and place them in a string.
                            plaintext = srDecrypt.ReadToEnd();
                    }
                }
            }
            finally
            {
                // Clear the RijndaelManaged object.
                if (rijndaelManaged != null)
                    rijndaelManaged.Clear();
            }

            return plaintext;
        }

        private static byte[] ReadByteArray(Stream s)
        {
            byte[] rawLength = new byte[sizeof(int)];
            if (s.Read(rawLength, 0, rawLength.Length) != rawLength.Length)
            {
                throw new SystemException("Stream did not contain properly formatted byte array");
            }

            byte[] buffer = new byte[BitConverter.ToInt32(rawLength, 0)];
            if (s.Read(buffer, 0, buffer.Length) != buffer.Length)
            {
                throw new SystemException("Did not read byte array properly");
            }

            return buffer;
        }
    }
}
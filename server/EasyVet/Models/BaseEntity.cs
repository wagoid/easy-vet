using System.ComponentModel.DataAnnotations;

namespace EasyVet.Models
{
    public class BaseEntity
    {
        public int Id { get; set; }
        [Timestamp]
        public byte[] RowVersion { get; set; }
    }
}

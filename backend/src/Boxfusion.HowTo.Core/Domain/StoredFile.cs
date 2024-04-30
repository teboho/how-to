using Abp.Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boxfusion.HowTo.Domain
{
    public class StoredFile : Entity<Guid>
    {
        [NotMapped]
        public virtual IFormFile File { get; set; }
        public virtual string FileName { get; set; }
        public virtual string FileType { get; set; }
    }
}

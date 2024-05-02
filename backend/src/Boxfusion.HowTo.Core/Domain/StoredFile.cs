using Abp.Domain.Entities.Auditing;
using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boxfusion.HowTo.Domain
{
    /// <summary>
    /// Represents a stored file (blob) in the system.
    /// </summary>
    public class StoredFile : FullAuditedEntity<Guid>
    {
        [NotMapped]
        public virtual IFormFile File { get; set; }
        public virtual string FileName { get; set; }
        public virtual string FileType { get; set; }
        public virtual string BasePath { get; set; }
    }
}

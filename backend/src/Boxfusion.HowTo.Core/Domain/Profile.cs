using Abp.Domain.Entities.Auditing;
using System;

namespace Boxfusion.HowTo.Domain
{
    public class Profile : FullAuditedEntity<Guid>
    {
        public string IdentityNo { get; set; }
        public string Username { get; set; }
        public Guid StoredFileId { get; set; }

        //[ForeignKey("StoredFileId")]
        //public StoredFile StoredFileModel { get; set; }
    }
}

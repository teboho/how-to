using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;

namespace Boxfusion.HowTo.Domain
{
    public class Portfolio : FullAuditedEntity<Guid>
    {
        public List<string> Links { get; set; }
        //public Guid StoredFileId { get; set; }

        //[ForeignKey("StoredFileId")]
        //public StoredFile StoredFileModel { get; set; }
    }
}

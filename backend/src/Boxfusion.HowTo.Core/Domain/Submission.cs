using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boxfusion.HowTo.Domain
{
    public class Submission : FullAuditedEntity<Guid>
    {
        public Guid TaskId { get; set; }
        [ForeignKey("TaskId")]
        public Task Task { get; set; }
        public Guid StoredFileId { get; set; }
        [ForeignKey("StoredFileId")]
        public StoredFile StoredFile { get; set; }
    }
}

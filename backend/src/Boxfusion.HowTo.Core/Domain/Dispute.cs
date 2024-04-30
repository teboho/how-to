using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boxfusion.HowTo.Domain
{
    public class Dispute : FullAuditedEntity<Guid>
    {
        public string Content { get; set; }
        public Guid TaskId { get; set; }
        [ForeignKey("TaskId")]
        public Task Task { get; set; }
        public DisputeStatus Status { get; set; }
    }

    public enum DisputeStatus
    {
        NEW,
        PROCESSING,
        RESOLVED
    }
}

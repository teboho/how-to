using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boxfusion.HowTo.Domain
{
    /// <summary>
    /// With rating
    /// </summary>
    public class Review : FullAuditedEntity<Guid>
    {
        public byte Rating { get; set; }
        public string Content { get; set; }
        public Guid TaskId { get; set; }
        [ForeignKey("TaskId")]
        public Task Task { get; set; }
    }
}

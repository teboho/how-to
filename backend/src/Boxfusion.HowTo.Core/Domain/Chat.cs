using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boxfusion.HowTo.Domain
{
    public class Chat : FullAuditedEntity<Guid>
    {
        public Guid TaskId { get; set; }
        [ForeignKey("TaskId")]
        public Task Task { get; set; }
        
        public string Content { get; set;  }
    }
}

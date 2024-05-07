using Abp.Domain.Entities.Auditing;
using System;

namespace Boxfusion.HowTo.Domain
{
    public class Task : FullAuditedEntity<Guid>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        //public long OwnerId { get; set;  // this will be handled by the FullAuditedEntity
        //[ForeignKey("OwnerId")]
        //public User Owner { get; set; }
        public float Amount { get; set; }
        public int Views { get; set; }
        public int TimeFrame { get; set; }
        // public DateTime DueDate { get; set; }
        public TaskStatus Status { get; set; }
    }

    public enum TaskStatus
    {
        NEW,
        ASSIGNED,
        DONE
    }
}

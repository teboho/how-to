using Abp.Domain.Entities.Auditing;
using System;

namespace Boxfusion.HowTo.Domain
{
    public class Task : FullAuditedEntity<Guid>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public float Amount { get; set; }
        public int Views { get; set; }
        public int TimeFrame { get; set; }
        public MyTaskStatus Status { get; set; }
    }

    public enum MyTaskStatus
    {
        NEW,
        ASSIGNED,
        DONE
    }
}

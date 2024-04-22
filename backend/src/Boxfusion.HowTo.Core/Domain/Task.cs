using Abp.Domain.Entities.Auditing;
using Boxfusion.HowTo.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Domain
{
    public class Task : FullAuditedEntity<Guid>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public long OwnerId { get; set; }
        [ForeignKey("OwnerId")]
        public User Owner { get; set; }
        public float Amount { get; set; }
        public int Views { get; set; }
        public int TimeFrame { get; set; }
        public TaskStatus Status { get; set; }
    }

    public enum  TaskStatus
    {
        NEW,
        ASSIGNED,
        DONE
    }
}

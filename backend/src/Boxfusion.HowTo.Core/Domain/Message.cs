using Abp.Authorization.Users;
using Abp.Domain.Entities.Auditing;
using Boxfusion.HowTo.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Domain
{
    public class Message : CreationAuditedEntity<Guid>
    {
        public Guid TaskId { get; set; }
        [ForeignKey("TaskId")]
        public Task Task { get; set; }
        public long ReceiverId { get; set; }
        [ForeignKey("ReceiverId")]
        public User Receiver { get; set; }
    }
}

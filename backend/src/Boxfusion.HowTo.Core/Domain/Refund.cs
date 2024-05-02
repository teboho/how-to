using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boxfusion.HowTo.Domain
{
    public class Refund : FullAuditedEntity<Guid>
    {
        public float Amount { get; set; }
        public Guid DisputeId { get; set; }
        [ForeignKey("DisputeId")]
        public Dispute Dispute { get; set; }
    }
}

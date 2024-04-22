using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Domain
{
    public class Refund : FullAuditedEntity
    {
        public float Amount { get; set; }
        public Guid DisputeId { get; set; }
        [ForeignKey("DisputeId")]
        public Dispute Dispute { get; set; }
    }
}

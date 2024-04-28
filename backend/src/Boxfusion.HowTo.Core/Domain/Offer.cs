using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Domain
{
    public class Offer : FullAuditedEntity<Guid>
    {
        public Guid TaskId { get; set; }
        [ForeignKey("TaskId")]
        public Task Task { get; set; }
        public float CounterAmount { get; set; }
        public OfferStatus Status { get; set; }
    }

    /// <summary>
    /// 0 - Created  
    /// <br />
    /// 1 - Accepted
    /// </summary>
    public enum OfferStatus
    {
        CREATED,
        ACCEPTED,
        REJECTED
    }
}

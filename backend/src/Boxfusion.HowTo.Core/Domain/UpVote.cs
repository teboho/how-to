using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boxfusion.HowTo.Domain
{
    public class UpVote : FullAuditedEntity<Guid>
    {
        public Guid GuideId { get; set; }
        [ForeignKey("GuideId")]
        public Guide Guide { get; set; }
    }
}

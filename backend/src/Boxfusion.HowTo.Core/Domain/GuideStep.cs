using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boxfusion.HowTo.Domain
{
    public class GuideStep : FullAuditedEntity<Guid>
    {
        public string Description { get; set; }
        public int Order { get; set; }
        public Guid GuideId { get; set; }
        [ForeignKey("GuideId")]
        public Guide Guide { get; set; }
    }
}

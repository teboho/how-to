using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boxfusion.HowTo.Domain
{
    public class Media : FullAuditedEntity<Guid>
    {
        public string FileName { get; set; }
        public MediaType Type { get; set; }
        public Guid GuideStepId { get; set; }
        [ForeignKey("GuideStepId")]
        public GuideStep GuideStep { get; set; }
    }

    public enum MediaType
    {
        IMAGE,
        VIDEO
    }
}

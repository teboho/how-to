using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

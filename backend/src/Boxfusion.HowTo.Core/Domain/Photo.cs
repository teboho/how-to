using Abp.Domain.Entities.Auditing;
using System;

namespace Boxfusion.HowTo.Domain
{
    public class Photo : FullAuditedEntity<Guid>
    {
        public string FileName { get; set; }
    }
}

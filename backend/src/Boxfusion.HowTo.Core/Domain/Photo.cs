using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Domain
{
    public class Photo : FullAuditedEntity<Guid>
    {
        public string FileName { get; set; }
    }
}

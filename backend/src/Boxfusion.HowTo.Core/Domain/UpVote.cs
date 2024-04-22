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
    public class UpVote : FullAuditedEntity<Guid>
    {
        public Guid GuideId { get; set; }
        [ForeignKey("GuideId")]
        public Guide Guide { get; set; }
    }
}

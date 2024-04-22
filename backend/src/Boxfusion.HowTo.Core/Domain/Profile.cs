using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Domain
{
    public class Profile : FullAuditedEntity<Guid>
    {
        public string  IdentityNo { get; set; }
        public bool IsVerified { get; set; }
        public Guid PhotoId { get; set; }
        [ForeignKey("PhotoId")]
        public Photo Photo { get; set; }
    }

    public enum ProfileType
    {
        Client,
        Executor,
        Support
    }
}

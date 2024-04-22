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
    public class Payment : FullAuditedEntity<Guid>
    {
        public long PayerId { get; set; }
        [ForeignKey("PayerId")]
        public User Payer { get; set; }
        public long BeneficiaryId { get; set; }
        [ForeignKey("BeneficiaryId")]
        public User Beneficiary { get; set; }
        public string Description { get; set; }
        public float Amount { get; set; }
    }
}

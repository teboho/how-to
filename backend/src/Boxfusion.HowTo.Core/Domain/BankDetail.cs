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
    public class BankDetail : FullAuditedEntity<Guid>
    {
        public long UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public string AccountNumber { get; set; }
        public string BankName { get; set; }
        public string BranchName { get; set; }
    }
}

using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Domain
{
    public class Payable : FullAuditedEntity<Guid>
    {
        public string Reference { get; set; }
        public decimal Amount { get; set; }
        public bool IsPaid { get; set; }
        public Guid BankDetailId { get; set; }
        [ForeignKey("BankDetailId")]
        public BankDetail BankDetail { get; set; }
    }
}

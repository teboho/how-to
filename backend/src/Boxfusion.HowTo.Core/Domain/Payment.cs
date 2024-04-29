using Abp.Domain.Entities.Auditing;
using Boxfusion.HowTo.Authorization.Users;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boxfusion.HowTo.Domain
{
    public class Payment : FullAuditedEntity<Guid>
    {
        public long BeneficiaryId { get; set; }
        [ForeignKey("BeneficiaryId")]
        public User Beneficiary { get; set; }
        public Guid TaskId { get; set; }
        [ForeignKey("TaskId")]
        public Task Task { get; set; }
        public string Reference { get; set; }
        public string Bank { get; set; }
        public string Transaction { get; set; }
        public float Amount { get; set; }
    }
}

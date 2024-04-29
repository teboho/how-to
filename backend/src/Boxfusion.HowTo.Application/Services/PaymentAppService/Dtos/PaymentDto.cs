using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;

namespace Boxfusion.HowTo.Services.PaymentAppService.Dtos
{
    [AutoMap(typeof(Domain.Payment))]
    public class PaymentDto : FullAuditedEntityDto<Guid>
    {
        public long BeneficiaryId { get; set; }
        public Guid TaskId { get; set; }
        public string Reference { get; set; }
        public string Bank { get; set; }
        public string Transaction { get; set; } // Connects to the Payfast transaction id
        public float Amount { get; set; }
    }
}

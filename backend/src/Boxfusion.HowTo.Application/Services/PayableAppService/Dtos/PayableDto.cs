using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;

namespace Boxfusion.HowTo.Services.PayableAppService.Dtos
{
    [AutoMap(typeof(Domain.Payable))]
    public class PayableDto : FullAuditedEntityDto<Guid>
    {
        public string Reference { get; set; }
        public decimal Amount { get; set; }
        public bool IsPaid { get; set; }
        public Guid BankDetailId { get; set; }
    }
}

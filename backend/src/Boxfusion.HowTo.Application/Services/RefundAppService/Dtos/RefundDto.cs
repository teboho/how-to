using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;

namespace Boxfusion.HowTo.Services.RefundAppService.Dtos
{
    [AutoMap(typeof(Domain.Refund))]
    public class RefundDto : FullAuditedEntityDto<Guid>
    {
        public float Amount { get; set; }
        public Guid DisputeId { get; set; }
    }
}

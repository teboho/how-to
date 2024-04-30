using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.HowTo.Domain;
using System;

namespace Boxfusion.HowTo.Services.DisputeAppService.Dtos
{
    [AutoMap(typeof(Dispute))]
    public class DisputeDto : FullAuditedEntityDto<Guid>
    {
        public string Content { get; set; }
        public Guid TaskId { get; set; }
        public DisputeStatus Status { get; set; }
    }
}

using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;

namespace Boxfusion.HowTo.Services.MessageAppService.Dtos
{
    [AutoMap(typeof(Domain.Message))]
    public class MessageDto : CreationAuditedEntityDto<Guid>
    {
        public Guid TaskId { get; set; }
        public long ReceiverId { get; set; }
    }
}

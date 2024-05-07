using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.HowTo.Domain;
using System;

namespace Boxfusion.HowTo.Services.ChatAppService.Dtos
{
    [AutoMap(typeof(Chat))]
    public class ChatDto : FullAuditedEntityDto<Guid>
    {
        public string Content { get; set; }
        public Guid TaskId { get; set; }
    }
}

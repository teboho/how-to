using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;

namespace Boxfusion.HowTo.Services.UpVoteAppService.Dtos
{
    [AutoMap(typeof(Domain.UpVote))]
    public class UpVoteDto : FullAuditedEntityDto<Guid>
    {
        public Guid GuideId { get; set; }
    }
}

using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.UpVoteAppService.Dtos
{
    [AutoMap(typeof(Domain.UpVote))]
    public class UpVoteDto : FullAuditedEntityDto<Guid>
    {
        public Guid GuideId { get; set; }
    }
}

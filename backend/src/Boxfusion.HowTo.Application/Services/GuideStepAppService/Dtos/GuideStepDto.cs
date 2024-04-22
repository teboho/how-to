using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.GuideStepAppService.Dtos
{
    [AutoMap(typeof(Domain.GuideStep))]
    public class GuideStepDto : FullAuditedEntityDto<Guid>
    {
        public string Description { get; set; }
        public int Order { get; set; }
        public Guid GuideId { get; set; }
    }
}

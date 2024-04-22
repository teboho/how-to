using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.HowTo.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.MediaAppService.Dtos
{
    [AutoMap(typeof(Media))]
    public class MediaDto : FullAuditedEntityDto<Guid>
    {
        public string FileName { get; set; }
        public MediaType Type { get; set; }
        public Guid GuideStepId { get; set; }
    }
}

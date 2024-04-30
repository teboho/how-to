using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.ReviewAppService.Dtos
{
    [AutoMap(typeof(Domain.Rating))]
    public class RatingDto : FullAuditedEntityDto<Guid>
    {
        public byte Value { get; set; }
        public Guid TaskId { get; set; }
    }
}

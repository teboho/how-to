using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;

namespace Boxfusion.HowTo.Services.ReviewAppService.Dtos
{
    [AutoMap(typeof(Domain.Rating))]
    public class RatingDto : FullAuditedEntityDto<Guid>
    {
        public byte Value { get; set; }
        public Guid TaskId { get; set; }
    }
}

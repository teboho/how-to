using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;

namespace Boxfusion.HowTo.Services.ReviewAppService.Dtos
{
    [AutoMap(typeof(Domain.Review))]
    public class ReviewDto : FullAuditedEntityDto<Guid>
    {
        public string Content { get; set; }
        public byte Rating { get; set; }

        public Guid TaskId { get; set; }
    }
}

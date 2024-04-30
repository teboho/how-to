using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;

namespace Boxfusion.HowTo.Services.PhotoAppService.Dtos
{
    [AutoMap(typeof(Domain.Photo))]
    public class PhotoDto : FullAuditedEntityDto<Guid>
    {
        public string FileName { get; set; }
    }
}

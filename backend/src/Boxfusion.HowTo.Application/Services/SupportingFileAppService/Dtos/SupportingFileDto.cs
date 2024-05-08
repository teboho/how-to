using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.HowTo.Domain;
using System;

namespace Boxfusion.HowTo.Services.SupportingFileAppService.Dtos
{
    [AutoMap(typeof(Domain.SupportingFile))]
    public class SupportingFileDto : FullAuditedEntityDto<Guid>
    {
        public Guid TaskId { get; set; }
        public Guid StoredFileId { get; set; }
        public SupportingFileItemType ItemType { get; set; }
        public string Content { get; set; }

    }
}

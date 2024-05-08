using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;

namespace Boxfusion.HowTo.Services.SubmissionAppService.Dtos
{
    [AutoMap(typeof(Domain.Submission))]
    public class SubmissionDto : FullAuditedEntityDto<Guid>
    {
        public Guid TaskId { get; set; }
        public Guid StoredFileId { get; set; }
        public string Content { get; set; }

    }
}

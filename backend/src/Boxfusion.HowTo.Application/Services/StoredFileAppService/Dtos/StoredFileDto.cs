using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.HowTo.Domain;
using Microsoft.AspNetCore.Http;
using System;

namespace Boxfusion.HowTo.Services.StoredFileAppService.Dtos
{
    [AutoMap(typeof(StoredFile))]
    public class StoredFileDto : FullAuditedEntityDto<Guid>
    {
        public IFormFile File { get; set; }
        public string FileName { get; set; }
    }
}

using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.HowTo.Domain;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.StoredFileAppService.Dtos
{
    [AutoMap(typeof(StoredFile))]
    public class StoredFileDto : EntityDto<Guid>
    {
        public IFormFile File { get; set; }
        public string FileName { get; set; }
    }
}

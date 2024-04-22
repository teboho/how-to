using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.PhotoAppService.Dtos
{
    [AutoMap(typeof(Domain.Photo))]
    public class PhotoDto : FullAuditedEntityDto<Guid>
    {
        public string FileName { get; set; }
    }
}

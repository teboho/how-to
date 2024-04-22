using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.HowTo.Authorization.Users;
using Boxfusion.HowTo.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.GuideAppService.Dtos
{
    [AutoMap(typeof(Guide))]
    public class GuideDto : FullAuditedEntityDto<Guid>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int Views { get; set; }
        public long WriterId { get; set; }
        public GuideType Type { get; set; }
    }
}

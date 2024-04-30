using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;

namespace Boxfusion.HowTo.Services.PortfolioAppService.Dtos
{
    [AutoMap(typeof(Domain.Portfolio))]
    public class PortfolioDto : FullAuditedEntityDto<Guid>
    {
        public List<string> Links { get; set; }
    }
}

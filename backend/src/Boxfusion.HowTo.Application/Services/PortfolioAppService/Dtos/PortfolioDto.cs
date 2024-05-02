using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.HowTo.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boxfusion.HowTo.Services.PortfolioAppService.Dtos
{
    [AutoMap(typeof(Domain.Portfolio))]
    public class PortfolioDto : FullAuditedEntityDto<Guid>
    {
        public Guid ProfileId { get; set; }
        public Guid StoredFileId { get; set; }
        public PortfolioItemType ItemType { get; set; }
    }
}

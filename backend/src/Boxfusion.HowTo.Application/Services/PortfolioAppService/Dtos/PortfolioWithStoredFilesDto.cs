using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.HowTo.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.PortfolioAppService.Dtos
{
    [AutoMap(typeof(Domain.Portfolio))]
    public class GetPortfolioWithStoredFilesDto : FullAuditedEntityDto<Guid>
    {
        public Guid ProfileId { get; set; }
        public Guid StoredFileId { get; set; }
        public StoredFile StoredFile { get; set; }
        public PortfolioItemType ItemType { get; set; }
    }
}

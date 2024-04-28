using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;

namespace Boxfusion.HowTo.Services.BankDetailAppService.Dtos
{
    [AutoMap(typeof(Domain.BankDetail))]
    public class BankDetailDto : FullAuditedEntityDto<Guid>
    {
        public long UserId { get; set; }
        public string AccountNumber { get; set; }
        public string BankName { get; set; }
        public string BranchName { get; set; }
    }
}

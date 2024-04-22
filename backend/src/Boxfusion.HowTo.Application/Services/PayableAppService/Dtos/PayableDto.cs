using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.PayableAppService.Dtos
{
    [AutoMap(typeof(Domain.Payable))]
    public class PayableDto : FullAuditedEntityDto<Guid>
    {
        public string Reference { get; set; }
        public decimal Amount { get; set; }
        public bool IsPaid { get; set; }
        public Guid BankDetailId { get; set; }
    }
}

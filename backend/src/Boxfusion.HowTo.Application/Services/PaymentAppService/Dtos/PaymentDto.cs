using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.HowTo.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.PaymentAppService.Dtos
{
    [AutoMap(typeof(Domain.Payment))]
    public class PaymentDto : FullAuditedEntityDto<Guid>
    {
        public long PayerId { get; set; }
        public long BeneficiaryId { get; set; }
        public string Description { get; set; }
        public float Amount { get; set; }
    }
}

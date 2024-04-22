using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.ProfileAppService.Dtos
{
    [AutoMap(typeof(Domain.Profile))]
    public class ProfileDto : FullAuditedEntityDto<Guid>
    {
        public string IdentityNo { get; set; }
        public bool IsVerified { get; set; }
        public Guid PhotoId { get; set; }
    }
}

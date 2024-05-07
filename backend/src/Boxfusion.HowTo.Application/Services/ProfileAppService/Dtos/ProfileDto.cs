using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;

namespace Boxfusion.HowTo.Services.ProfileAppService.Dtos
{
    [AutoMap(typeof(Domain.Profile))]
    public class ProfileDto : FullAuditedEntityDto<Guid>
    {
        public string IdentityNo { get; set; }
        public string Username { get; set; }
        public Guid StoredFileId { get; set; }
    }
}

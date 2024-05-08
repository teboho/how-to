using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;

namespace Boxfusion.HowTo.Services.ProfileAppService.Dtos
{
    public class ProfileDto : FullAuditedEntityDto<Guid>
    {
        public string IdentityNo { get; set; }
        public string Username { get; set; }
        public string Bio { get; set; }

        public Guid StoredFileId { get; set; }
    }
}

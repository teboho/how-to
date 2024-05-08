using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.HowTo.Authorization.Users;
using Boxfusion.HowTo.Users.Dto;
using System;

namespace Boxfusion.HowTo.Services.ProfileAppService.Dtos
{
    [AutoMap(typeof(Domain.Profile))]
    public class FullProfileDto : FullAuditedEntityDto<Guid>
    {
        public string IdentityNo { get; set; }
        public string Username { get; set; }
        public string Bio { get; set; }

        public Guid StoredFileId { get; set; }
        UserDto User { get; set; }
    }
}

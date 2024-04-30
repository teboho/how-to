using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.HowTo.Domain;
using System;

namespace Boxfusion.HowTo.Services.UserFileStoreAppService.Dtos
{
    [AutoMap(typeof(UserFileStore))]
    public class UserFileStoreDto : EntityDto<Guid>
    {
        public long UserId { get; set; }
        public Guid FileId { get; set; }
    }
}

using Abp.Application.Services;
using Boxfusion.HowTo.Services.ProfileAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.ProfileAppService
{
    public interface IProfileAppService : IAsyncCrudAppService<ProfileDto, Guid>
    {
    }
}

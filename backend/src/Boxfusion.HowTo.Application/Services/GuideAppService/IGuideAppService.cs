using Abp.Application.Services;
using Boxfusion.HowTo.Services.GuideAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.GuideAppService
{
    public interface IGuideAppService : IAsyncCrudAppService<GuideDto, Guid>
    {
    }
}

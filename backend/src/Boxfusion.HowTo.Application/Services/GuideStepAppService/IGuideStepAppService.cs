using Abp.Application.Services;
using Boxfusion.HowTo.Services.GuideStepAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.GuideStepAppService
{
    public interface IGuideStepAppService : IAsyncCrudAppService<GuideStepDto, Guid>
    {
    }
}

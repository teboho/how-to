using Abp.Application.Services;
using Boxfusion.HowTo.Services.GuideStepAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.GuideStepAppService
{
    public interface IGuideStepAppService : IAsyncCrudAppService<GuideStepDto, Guid>
    {
    }
}

using Abp.Application.Services;
using Boxfusion.HowTo.Services.GuideAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.GuideAppService
{
    public interface IGuideAppService : IAsyncCrudAppService<GuideDto, Guid>
    {
    }
}

using Abp.Application.Services;
using Boxfusion.HowTo.Services.MediaAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.MediaAppService
{
    public interface IMediaAppService : IAsyncCrudAppService<MediaDto, Guid>
    {
    }
}

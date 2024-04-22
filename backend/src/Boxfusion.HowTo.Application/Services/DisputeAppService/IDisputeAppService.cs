using Abp.Application.Services;
using Boxfusion.HowTo.Services.DisputeAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.DisputeAppService
{
    public interface IDisputeAppService : IAsyncCrudAppService<DisputeDto, Guid>
    {
    }
}

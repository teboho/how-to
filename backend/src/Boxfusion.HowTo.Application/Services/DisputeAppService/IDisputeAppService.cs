using Abp.Application.Services;
using Boxfusion.HowTo.Services.DisputeAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.DisputeAppService
{
    public interface IDisputeAppService : IAsyncCrudAppService<DisputeDto, Guid>
    {
    }
}

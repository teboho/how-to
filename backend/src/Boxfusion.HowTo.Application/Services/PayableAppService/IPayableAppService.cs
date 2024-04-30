using Abp.Application.Services;
using Boxfusion.HowTo.Services.PayableAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.PayableAppService
{
    public interface IPayableAppService : IAsyncCrudAppService<PayableDto, Guid>
    {
    }
}

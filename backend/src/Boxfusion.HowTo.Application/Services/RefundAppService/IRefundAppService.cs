using Abp.Application.Services;
using Boxfusion.HowTo.Services.RefundAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.RefundAppService
{
    public interface IRefundAppService : IAsyncCrudAppService<RefundDto, Guid>
    {
    }
}

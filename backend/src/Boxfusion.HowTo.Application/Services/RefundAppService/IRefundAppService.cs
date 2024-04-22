using Abp.Application.Services;
using Boxfusion.HowTo.Services.RefundAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.RefundAppService
{
    public interface IRefundAppService : IAsyncCrudAppService<RefundDto, Guid>
    {
    }
}

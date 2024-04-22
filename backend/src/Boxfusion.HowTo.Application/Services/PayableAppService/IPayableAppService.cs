using Abp.Application.Services;
using Boxfusion.HowTo.Services.PayableAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.PayableAppService
{
    public interface IPayableAppService : IAsyncCrudAppService<PayableDto, Guid>
    {
    }
}

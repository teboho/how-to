using Abp.Application.Services;
using Boxfusion.HowTo.Services.PaymentAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.PaymentAppService
{
    public interface IPaymentAppService : IAsyncCrudAppService<PaymentDto, Guid>
    {
    }
}

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
        /// <summary>
        /// Only those payments made by the current user
        /// </summary>
        /// <returns></returns>
        protected Task<List<PaymentDto>> GetMyPayments();
    }
}

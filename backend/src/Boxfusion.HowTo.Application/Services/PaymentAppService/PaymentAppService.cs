using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.PaymentAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.PaymentAppService
{
    public class PaymentAppService : AsyncCrudAppService<Payment, PaymentDto, Guid>, IPaymentAppService
    {
        IRepository<Payment, Guid> _repository;
        public PaymentAppService(IRepository<Payment, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

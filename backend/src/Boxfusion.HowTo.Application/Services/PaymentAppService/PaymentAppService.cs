using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Services.PaymentAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.PaymentAppService
{
    public class PaymentAppService : AsyncCrudAppService<Domain.Payment, PaymentDto, Guid>, IPaymentAppService
    {
        IRepository<Domain.Payment, Guid> _repository;
        public PaymentAppService(IRepository<Domain.Payment, Guid> repository) : base(repository)
        {
            _repository = repository;
        }

        /// <inheritdoc/>
        public Task<List<PaymentDto>> GetMyPayments()
        {
            var payments = _repository.GetAllList(p => p.CreatorUserId == AbpSession.UserId);
            return Task.FromResult(ObjectMapper.Map<List<PaymentDto>>(payments));
        }
    }
}

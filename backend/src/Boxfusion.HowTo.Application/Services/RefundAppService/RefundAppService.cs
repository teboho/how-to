using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.RefundAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.RefundAppService
{
    public class RefundAppService : AsyncCrudAppService<Refund, RefundDto, Guid>, IRefundAppService
    {
        IRepository<Refund, Guid> _repository;
        public RefundAppService(IRepository<Refund, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

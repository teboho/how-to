using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.PayableAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.PayableAppService
{
    public class PayableAppService : AsyncCrudAppService<Payable, PayableDto, Guid>, IPayableAppService
    {
        IRepository<Payable, Guid> _repository;
        public PayableAppService(IRepository<Payable, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Services.BankDetailAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.BankDetailAppService
{
    public class BankDetailAppService : AsyncCrudAppService<Domain.BankDetail, BankDetailDto, Guid>, IBankDetailAppService
    {
        IRepository<Domain.BankDetail, Guid> _repository;
        public BankDetailAppService(IRepository<Domain.BankDetail, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

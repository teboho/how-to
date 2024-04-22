using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Services.BankDetail;
using Boxfusion.HowTo.Services.BankDetail.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

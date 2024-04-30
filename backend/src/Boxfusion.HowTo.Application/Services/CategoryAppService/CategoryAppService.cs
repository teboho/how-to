using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Services.BankDetailAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.BankDetailAppService
{
    public class CategoryAppService : AsyncCrudAppService<Domain.Category, CategoryDto, Guid>, ICategoryAppService
    {
        IRepository<Domain.Category, Guid> _repository;
        public CategoryAppService(IRepository<Domain.Category, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

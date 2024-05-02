using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Services.TaskAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.TaskAppService
{
    public class ExecutorCategoryAppService : AsyncCrudAppService<Domain.ExecutorCategory, ExecutorCategoryDto, Guid>, IExecutorCategoryAppService
    {
        IRepository<Domain.ExecutorCategory, Guid> _repository;
        public ExecutorCategoryAppService(IRepository<Domain.ExecutorCategory, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

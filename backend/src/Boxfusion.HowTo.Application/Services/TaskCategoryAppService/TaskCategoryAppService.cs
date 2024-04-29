using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Services.TaskAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.TaskAppService
{
    public class TaskCategoryAppService : AsyncCrudAppService<Domain.TaskCategory, TaskCategoryDto, Guid>, ITaskCategoryAppService
    {
        IRepository<Domain.TaskCategory, Guid> _repository;
        public TaskCategoryAppService(IRepository<Domain.TaskCategory, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

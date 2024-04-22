using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.TaskAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Boxfusion.HowTo.Services.TaskAppService
{
    public class TaskAppService : AsyncCrudAppService<Task, TaskDto, Guid>, ITaskAppService
    {
        IRepository<Task, Guid> _repository;
        public TaskAppService(IRepository<Task, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

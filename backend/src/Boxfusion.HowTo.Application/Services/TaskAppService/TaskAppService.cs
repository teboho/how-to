using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Services.TaskAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.TaskAppService
{
    public class TaskAppService : AsyncCrudAppService<Domain.Task, TaskDto, Guid>, ITaskAppService
    {
        IRepository<Domain.Task, Guid> _repository;
        public TaskAppService(IRepository<Domain.Task, Guid> repository) : base(repository)
        {
            _repository = repository;
        }

        [AbpAuthorize(["Pages.Tasks.Create"])]
        public override Task<TaskDto> CreateAsync(TaskDto input)
        {
            return base.CreateAsync(input);
        }

        public Task<List<TaskDto>> GetMyTasks()
        {
            var tasks = _repository.GetAllList(t => t.CreatorUserId == AbpSession.UserId);
            return Task.FromResult(ObjectMapper.Map<List<TaskDto>>(tasks));
        }
    }
}

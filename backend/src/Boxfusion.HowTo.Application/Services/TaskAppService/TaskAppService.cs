using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Services.TaskAppService.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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

        /// <summary>
        /// Only those tasks created by the current user
        /// </summary>
        /// <returns></returns>
        public Task<List<TaskDto>> GetMyTasks()
        {
            var tasks = _repository.GetAllList(t => t.CreatorUserId == AbpSession.UserId);
            return Task.FromResult(ObjectMapper.Map<List<TaskDto>>(tasks));
        }

        // complete the task
        [HttpPut]
        public async Task<TaskDto> Complete(Guid taskId)
        {
            var task = await _repository.GetAsync(taskId);
            task.Status = Domain.TaskStatus.DONE;
            await _repository.UpdateAsync(task);
            CurrentUnitOfWork.SaveChanges();
            return MapToEntityDto(task);
        }

        // increase the view count
        [HttpPut]
        public async Task<TaskDto> UpViews(Guid taskId)
        {
            var task = await _repository.GetAsync(taskId);
            task.Views++;
            await _repository.UpdateAsync(task);
            CurrentUnitOfWork.SaveChanges();
            return MapToEntityDto(task);
        }
    }
}

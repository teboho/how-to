using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Services.OfferAppService.Dtos;
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
        IRepository<Domain.Offer, Guid> _offerRepository;
        public TaskAppService(IRepository<Domain.Task, Guid> repository,
        IRepository<Domain.Offer, Guid> offerRepository
        ) : base(repository)
        {
            _repository = repository;
            _offerRepository = offerRepository;
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
            task.Status = Domain.MyTaskStatus.DONE;
            await _repository.UpdateAsync(task);
            CurrentUnitOfWork.SaveChanges();
            return MapToEntityDto(task);
        }

        // get all offers for a task
        public Task<List<OfferDto>> GetOffers(Guid taskId)
        {
            var offers = _offerRepository.GetAllList(o => o.TaskId == taskId);
            return Task.FromResult(ObjectMapper.Map<List<OfferDto>>(offers));
        }

        // get task with accepted offer
        public Task<TaskWithOfferDto> GetTaskWithAcceptedOffer(Guid taskId)
        {
            var task = _repository.FirstOrDefault(t => t.Id == taskId);
            var taskWitOfferDto = ObjectMapper.Map<TaskWithOfferDto>(task);
            var offer = _offerRepository.FirstOrDefault(o => o.TaskId == taskId && o.Status == Domain.OfferStatus.ACCEPTED);
            var offerDto = ObjectMapper.Map<OfferDto>(offer);
            if (offer != null)
            {
                taskWitOfferDto.AcceptedOffer = offerDto;
            }
            return Task.FromResult(taskWitOfferDto);
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

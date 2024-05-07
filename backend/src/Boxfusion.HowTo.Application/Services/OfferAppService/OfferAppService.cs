using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Services.OfferAppService.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.OfferAppService
{
    public class OfferAppService : AsyncCrudAppService<Domain.Offer, OfferDto, Guid>, IOfferAppService
    {
        IRepository<Domain.Offer, Guid> _repository;
        IRepository<Domain.Task, Guid> _taskRepository;

        public OfferAppService(IRepository<Domain.Offer, Guid> repository, IRepository<Domain.Task, Guid> taskRepository) : base(repository)
        {
            _repository = repository;
            _taskRepository = taskRepository;
        }

        /// <summary>
        /// Offer made by the current user for the specified task
        /// </summary>
        /// <param name="taskId">task</param>
        /// <returns>offers</returns>
        public OfferDto GetMyOffer(Guid taskId)
        {
            var offer = _repository.FirstOrDefault(x => x.CreatorUserId == AbpSession.UserId && x.TaskId == taskId);
            return MapToEntityDto(offer);
        }

        // offers made for the specified task asynchronously
        public async Task<List<OfferDto>> GetOffers(Guid taskId)
        {
            var offers = await _repository.GetAllListAsync(x => x.TaskId == taskId);
            return ObjectMapper.Map<List<OfferDto>>(offers);
        }

        // Accept the offer
        [HttpPut]
        public async Task<OfferDto> Accept(Guid offerId)
        {
            var offer = await _repository.GetAsync(offerId);
            offer.Status = Domain.OfferStatus.ACCEPTED;
            await _repository.UpdateAsync(offer);
            CurrentUnitOfWork.SaveChanges();

            var offers = await _repository.GetAllListAsync(x => x.TaskId == offer.TaskId && x.Id != offerId);
            foreach (var o in offers)
            {
                o.Status = Domain.OfferStatus.REJECTED;
                await _repository.UpdateAsync(o);
            }
            CurrentUnitOfWork.SaveChanges();

            var task = await _taskRepository.GetAsync(offer.TaskId);
            task.Status = Domain.MyTaskStatus.ASSIGNED;
            await _taskRepository.UpdateAsync(task);
            CurrentUnitOfWork.SaveChanges();

            return ObjectMapper.Map<OfferDto>(offer);
        }
    }
}

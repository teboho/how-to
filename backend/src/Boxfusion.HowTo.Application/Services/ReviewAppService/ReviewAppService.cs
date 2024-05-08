using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Services.ReviewAppService.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.ReviewAppService
{
    public class ReviewAppService : AsyncCrudAppService<Domain.Review, ReviewDto, Guid>, IReviewAppService
    {
        IRepository<Domain.Review, Guid> _repository;
        IRepository<Domain.Task, Guid> _taskRepository;
        IRepository<Domain.Offer, Guid> _offerRepository;
        public ReviewAppService(IRepository<Domain.Review, Guid> repository,
            IRepository<Domain.Task, Guid> taskRepository,
            IRepository<Domain.Offer, Guid> offerRepository   
        ) : base(repository)
        {
            _repository = repository;
            _taskRepository = taskRepository;
            _offerRepository = offerRepository;
        }

        public async Task<Domain.Review> GetReviewByTaskAsync(Guid taskId)
        {
            return await _repository.GetAll().Where(r => r.TaskId == taskId).FirstOrDefaultAsync();
        }

        // get average rating for a user associated with specific tasks.. via their offer that was accepted
        public async Task<object> GetAverageRatingForUserAsync(long userId)
        {
            var tasks = _taskRepository.GetAll();
            var offers = _offerRepository.GetAll().Where(o => o.CreatorUserId == userId && o.Status == Domain.OfferStatus.ACCEPTED);
            var ratingSum = 0.0;
            var count = 0;
            foreach (var offer in offers)
            {
                var task = await tasks.Where(t => t.Id == offer.TaskId).FirstOrDefaultAsync();
                if (task != null)
                {
                    var review = await GetReviewByTaskAsync(task.Id);
                    if (review != null)
                    {
                        ratingSum += review.Rating;
                        count++;
                    }
                }
            }
            return new
            {
                AverageRating = count > 0 ? ratingSum / count : 5,
                Count = count
            };
        }
    }
}

using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.ReviewAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.ReviewAppService
{
    public class ReviewAppService : AsyncCrudAppService<Review, ReviewDto, Guid>, IReviewAppService
    {
        IRepository<Review, Guid> _repository;
        public ReviewAppService(IRepository<Review, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

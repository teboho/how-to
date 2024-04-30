using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.ReviewAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.ReviewAppService
{
    public class RatingAppService : AsyncCrudAppService<Rating, RatingDto, Guid>, IRatingAppService
    {
        IRepository<Rating, Guid> _repository;
        public RatingAppService(IRepository<Rating, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

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
        public ReviewAppService(IRepository<Domain.Review, Guid> repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<Domain.Review> GetReviewByTaskAsync(Guid taskId)
        {
            return await _repository.GetAll().Where(r => r.TaskId == taskId).FirstOrDefaultAsync();
        }
    }
}

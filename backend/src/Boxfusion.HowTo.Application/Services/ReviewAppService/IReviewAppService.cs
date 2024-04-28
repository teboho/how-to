using Abp.Application.Services;
using Boxfusion.HowTo.Services.ReviewAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.ReviewAppService
{
    public interface IReviewAppService : IAsyncCrudAppService<ReviewDto, Guid>
    {
    }
}

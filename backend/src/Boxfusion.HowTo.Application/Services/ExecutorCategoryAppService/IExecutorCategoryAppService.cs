using Abp.Application.Services;
using Boxfusion.HowTo.Services.TaskAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.TaskAppService
{
    public interface IExecutorCategoryAppService : IAsyncCrudAppService<ExecutorCategoryDto, Guid>
    {
    }
}

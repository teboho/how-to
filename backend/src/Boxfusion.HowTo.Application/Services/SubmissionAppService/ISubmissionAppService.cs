using Abp.Application.Services;
using Boxfusion.HowTo.Services.SubmissionAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.SubmissionAppService
{
    public interface ISubmissionAppService : IAsyncCrudAppService<SubmissionDto, Guid>
    {
    }
}

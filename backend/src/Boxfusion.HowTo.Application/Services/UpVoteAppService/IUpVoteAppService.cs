using Abp.Application.Services;
using Boxfusion.HowTo.Services.UpVoteAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.UpVoteAppService
{
    public interface IUpVoteAppService : IAsyncCrudAppService<UpVoteDto, Guid>
    {
    }
}

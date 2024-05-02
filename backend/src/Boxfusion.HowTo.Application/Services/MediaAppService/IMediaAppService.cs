using Abp.Application.Services;
using Boxfusion.HowTo.Services.MediaAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.MediaAppService
{
    public interface IMediaAppService : IAsyncCrudAppService<MediaDto, Guid>
    {
    }
}

using Abp.Application.Services;
using Boxfusion.HowTo.Services.ChatAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.ChatAppService
{
    public interface IChatAppService : IAsyncCrudAppService<ChatDto, Guid>
    {
    }
}

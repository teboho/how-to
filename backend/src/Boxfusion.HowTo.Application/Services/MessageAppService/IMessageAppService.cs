using Abp.Application.Services;
using Boxfusion.HowTo.Services.MessageAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.MessageAppService
{
    public interface IMessageAppService : IAsyncCrudAppService<MessageDto, Guid>
    {
    }
}

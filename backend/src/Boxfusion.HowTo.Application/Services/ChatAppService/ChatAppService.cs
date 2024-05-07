using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Services.ChatAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.ChatAppService
{
    public class ChatAppService : AsyncCrudAppService<Domain.Chat, ChatDto, Guid>, IAsyncCrudAppService<ChatDto, Guid>
    {
        private IRepository<Domain.Chat, Guid> _repository;
        public ChatAppService(IRepository<Domain.Chat, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

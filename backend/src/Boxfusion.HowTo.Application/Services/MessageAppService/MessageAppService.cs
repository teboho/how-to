using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.MessageAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.MessageAppService
{
    public class MessageAppService : AsyncCrudAppService<Message, MessageDto, Guid>, IMessageAppService
    {
        IRepository<Message, Guid> _repository;
        public MessageAppService(IRepository<Message, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

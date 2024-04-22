using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.MessageAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

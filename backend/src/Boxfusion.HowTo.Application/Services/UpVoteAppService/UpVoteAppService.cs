using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.UpVoteAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.UpVoteAppService
{
    public class UpVoteAppService : AsyncCrudAppService<UpVote, UpVoteDto, Guid>, IUpVoteAppService
    {
        IRepository<UpVote, Guid> _repository;
        public UpVoteAppService(IRepository<UpVote, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

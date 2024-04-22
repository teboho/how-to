using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.UpVoteAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

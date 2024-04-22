using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Services.DisputeAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.DisputeAppService
{
    public class DisputeAppService : AsyncCrudAppService<Domain.Dispute, DisputeDto, Guid>, IAsyncCrudAppService<DisputeDto, Guid>
    {
        private IRepository<Domain.Dispute, Guid> _repository;
        public DisputeAppService(IRepository<Domain.Dispute, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

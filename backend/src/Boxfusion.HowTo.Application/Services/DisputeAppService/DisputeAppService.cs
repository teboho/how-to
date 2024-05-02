using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Services.DisputeAppService.Dtos;
using System;

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

using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Services.GuideAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.GuideAppService
{
    public class GuideAppService : AsyncCrudAppService<Domain.Guide, GuideDto, Guid>, IGuideAppService
    {
        private IRepository<Domain.Guide, Guid> _repository;
        public GuideAppService(IRepository<Domain.Guide, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

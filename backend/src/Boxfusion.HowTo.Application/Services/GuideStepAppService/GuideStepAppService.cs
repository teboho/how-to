using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.GuideStepAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.GuideStepAppService
{
    public class GuideStepAppService : AsyncCrudAppService<GuideStep, GuideStepDto, Guid>, IGuideStepAppService
    {
        IRepository<GuideStep, Guid> _repository;
        public GuideStepAppService(IRepository<GuideStep, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

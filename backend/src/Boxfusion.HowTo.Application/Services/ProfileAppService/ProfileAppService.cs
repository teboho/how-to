using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.ProfileAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.ProfileAppService
{
    public class ProfileAppService : AsyncCrudAppService<Domain.Profile, ProfileDto, Guid>, IProfileAppService
    {
        IRepository<Profile, Guid> _repository;
        public ProfileAppService(IRepository<Profile, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

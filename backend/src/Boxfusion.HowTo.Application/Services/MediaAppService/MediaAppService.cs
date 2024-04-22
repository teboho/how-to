using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.MediaAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.MediaAppService
{
    public class MediaAppService : AsyncCrudAppService<Media, MediaDto, Guid>
    {
        IRepository<Media, Guid> _repository;
        public MediaAppService(IRepository<Media, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

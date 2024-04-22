using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.PhotoAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.PhotoAppService
{
    public class PhotoAppService : AsyncCrudAppService<Photo, PhotoDto, Guid>, IPhotoAppService
    {
        IRepository<Photo, Guid> _repository;
        public PhotoAppService(IRepository<Photo, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

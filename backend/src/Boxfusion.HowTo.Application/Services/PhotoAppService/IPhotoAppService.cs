using Abp.Application.Services;
using Boxfusion.HowTo.Services.PhotoAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.PhotoAppService
{
    public interface IPhotoAppService : IAsyncCrudAppService<PhotoDto, Guid>
    {
    }
}

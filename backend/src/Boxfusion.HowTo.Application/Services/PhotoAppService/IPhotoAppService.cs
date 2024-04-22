using Abp.Application.Services;
using Boxfusion.HowTo.Services.PhotoAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.PhotoAppService
{
    public interface IPhotoAppService : IAsyncCrudAppService<PhotoDto, Guid>
    {
    }
}

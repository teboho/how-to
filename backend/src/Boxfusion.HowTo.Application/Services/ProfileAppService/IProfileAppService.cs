using Abp.Application.Services;
using Boxfusion.HowTo.Services.ProfileAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.ProfileAppService
{
    public interface IProfileAppService : IAsyncCrudAppService<ProfileDto, Guid>
    {
    }
}

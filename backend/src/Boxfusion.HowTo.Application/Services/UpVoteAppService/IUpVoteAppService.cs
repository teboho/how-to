using Abp.Application.Services;
using Boxfusion.HowTo.Services.UpVoteAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.UpVoteAppService
{
    public interface IUpVoteAppService : IAsyncCrudAppService<UpVoteDto, Guid>
    {
    }
}

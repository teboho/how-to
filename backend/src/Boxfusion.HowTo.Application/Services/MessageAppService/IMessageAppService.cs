using Abp.Application.Services;
using Boxfusion.HowTo.Services.MessageAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.MessageAppService
{
    public interface IMessageAppService : IAsyncCrudAppService<MessageDto, Guid>
    {
    }
}

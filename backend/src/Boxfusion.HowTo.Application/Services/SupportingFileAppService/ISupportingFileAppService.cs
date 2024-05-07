using Abp.Application.Services;
using Boxfusion.HowTo.Services.SupportingFileAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.SupportingFileAppService
{
    public interface ISupportingFileAppService : IAsyncCrudAppService<SupportingFileDto, Guid>
    {
    }
}

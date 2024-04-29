using Abp.Application.Services;
using Boxfusion.HowTo.Services.BankDetailAppService.Dtos;
using System;


namespace Boxfusion.HowTo.Services.BankDetailAppService
{
    public interface ICategoryAppService : IAsyncCrudAppService<CategoryDto, Guid>
    {
    }
}

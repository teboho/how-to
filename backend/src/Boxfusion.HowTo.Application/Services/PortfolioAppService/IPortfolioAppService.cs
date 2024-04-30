using Abp.Application.Services;
using Boxfusion.HowTo.Services.PortfolioAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.PortfolioAppService
{
    public interface IPortfolioAppService : IAsyncCrudAppService<PortfolioDto, Guid>
    {
    }
}

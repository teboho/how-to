using Abp.Application.Services;
using Boxfusion.HowTo.Services.OfferAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.OfferAppService
{
    public interface IOfferAppService : IAsyncCrudAppService<OfferDto, Guid>
    {
    }
}

using Abp.Application.Services;
using Boxfusion.HowTo.MultiTenancy.Dto;

namespace Boxfusion.HowTo.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}


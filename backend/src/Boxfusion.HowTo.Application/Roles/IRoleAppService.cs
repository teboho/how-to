using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Boxfusion.HowTo.Roles.Dto;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Roles
{
    public interface IRoleAppService : IAsyncCrudAppService<RoleDto, int, PagedRoleResultRequestDto, CreateRoleDto, RoleDto>
    {
        Task<ListResultDto<PermissionDto>> GetAllPermissions();

        Task<GetRoleForEditOutput> GetRoleForEdit(EntityDto input);

        Task<ListResultDto<RoleListDto>> GetRolesAsync(GetRolesInput input);
    }
}

using Abp.Application.Services;
using Boxfusion.HowTo.Sessions.Dto;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}

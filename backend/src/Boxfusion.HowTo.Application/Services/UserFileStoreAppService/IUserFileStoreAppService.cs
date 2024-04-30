using Abp.Application.Services;
using System;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.UserFileStoreAppService
{
    public interface IUserFileStoreAppService : IAsyncCrudAppService<Dtos.UserFileStoreDto, Guid>
    {
        Task<Dtos.UserFileStoreDto> CreateUserFileStore(Dtos.UserFileStoreDto input);
    }
}

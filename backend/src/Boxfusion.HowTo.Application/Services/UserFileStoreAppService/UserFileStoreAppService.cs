using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Services.UserFileStoreAppService;
using Boxfusion.HowTo.Services.UserFileStoreAppService.Dtos;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.UserFileStoreAppService
{
    /// <summary>
    /// For the metadata of the file
    /// </summary>
    [AbpAuthorize]
    public class UserFileStoreAppService : AsyncCrudAppService<Domain.UserFileStore, UserFileStoreDto, Guid>, IUserFileStoreAppService
    {
        public IRepository<Domain.UserFileStore, Guid> _repository;
        public UserFileStoreAppService(IRepository<Domain.UserFileStore, Guid> repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<UserFileStoreDto> CreateUserFileStore(UserFileStoreDto input)
        {
            if (input != null)
            {
                var mappedInput = ObjectMapper.Map<Domain.UserFileStore>(input);
                var bridgeRecord = _repository.GetAll().FirstOrDefault(x => x.UserId == mappedInput.UserId);
                if (bridgeRecord == null) 
                {
                    await _repository.InsertAsync(mappedInput);
                    CurrentUnitOfWork.SaveChanges();
                    return ObjectMapper.Map<UserFileStoreDto>(mappedInput);
                }
                bridgeRecord.FileId = mappedInput.FileId;
                await _repository.UpdateAsync(bridgeRecord);
                CurrentUnitOfWork.SaveChanges();
                return ObjectMapper.Map<UserFileStoreDto>(bridgeRecord);
            }
            return null;
        }

        public async Task<UserFileStoreDto> GetUserFileStore(int userId)
        {
            var bridgeRecord = _repository.GetAll().FirstOrDefault(x => x.UserId == userId);
            if (bridgeRecord != null)
            {
                return ObjectMapper.Map<UserFileStoreDto>(bridgeRecord);
            }
            return null;
        }
    }
}

using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.ProfileAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.ProfileAppService
{
    public class ProfileAppService : AsyncCrudAppService<Domain.Profile, ProfileDto, Guid>, IProfileAppService
    {
        IRepository<Profile, Guid> _repository;
        public ProfileAppService(IRepository<Profile, Guid> repository) : base(repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// Create a profile for a user. If the profile already exists, it will update the existing profile.
        /// </summary>
        /// <param name="input">input profile data</param>
        /// <returns>the latest profile</returns>
        public override async Task<ProfileDto> CreateAsync(ProfileDto input)
        {
            // first we need to check if the profile already exists by comparing the creator user id that made the call to the one that might already be in the db
            var existingProfile = await _repository.FirstOrDefaultAsync(x => x.CreatorUserId == input.CreatorUserId);
            if (existingProfile != null)
            {
                // if the profile already exists, we will update the existing profile with the new data
                return await base.UpdateAsync(input);
            }
            return await base.CreateAsync(input);
        }

        /// <summary>
        /// Own profile can be retrieved by the user id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<ProfileDto> GetMyProfile(long userId)
        {
            var profile = await _repository.FirstOrDefaultAsync(x => x.CreatorUserId == userId);
            if (profile == null)
            {
                return null;
            }
            var profileDto = ObjectMapper.Map<ProfileDto>(profile);
            return await base.GetAsync(profileDto);
        }
    }
}

using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Boxfusion.HowTo.Services.ProfileAppService.Dtos;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.ProfileAppService
{
    public class ProfileAppService : AsyncCrudAppService<Domain.Profile, ProfileDto, Guid>, IProfileAppService
    {
        IRepository<Domain.Profile, Guid> _repository;
        IRepository<Domain.StoredFile, Guid> _storedFileRepository;
        private readonly string BASE_FILE_PATH = "App_Data/Images";
        private readonly string PROFILE_BASE_FILE_PATH = "App_Data/Profiles/Images";


        public ProfileAppService(IRepository<Domain.Profile, Guid> repository, IRepository<Domain.StoredFile, Guid> storedFileRepository) : base(repository)
        {
            _repository = repository;
            _storedFileRepository = storedFileRepository;
        }

        /// <summary>
        /// Create a profile for a user. If the profile already exists, it will update the existing profile.
        /// </summary>
        /// <param name="input">input profile data</param>
        /// <returns>the latest profile</returns>
        public override async Task<ProfileDto> CreateAsync(ProfileDto input)
        {
            var existingProfile = await _repository.FirstOrDefaultAsync(x => x.CreatorUserId == input.CreatorUserId);
            if (existingProfile != null && !input.IdentityNo.Trim().IsNullOrEmpty())
            {
                existingProfile.IdentityNo = input.IdentityNo.Trim();
                return await base.UpdateAsync(input);
            }
            return await base.CreateAsync(input);
        }

        /// <summary>
        /// Own profile can be retrieved by the user id
        /// </summary>
        /// <param name="userId">user id</param>
        /// <returns>user profile</returns>
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

        /// <summary>
        /// Upload a profile picture for a user
        /// </summary>
        /// <param name="input">Form data</param>
        /// <returns>The latest profile</returns>
        /// <exception cref="ArgumentException">If the input is not the appropriate form data</exception>
        //[HttpPost, Route("UploadProfilePicture")]
        //[Consumes("multipart/form-data")]
        //public async Task<ProfileDto> UploadProfilePictureAsync(
        //    [FromForm]
        //    UploadProfilePictureDto input
        //)
        //{
        //    var existingFile = await _storedFileRepository.FirstOrDefaultAsync(f => f.FileName == input.File.FileName);
        //    string potentialNewFileName = $"{Guid.NewGuid()}-{input.File.Name}-{Path.GetExtension(input.File.FileName)}";

        //    string filePath = existingFile != null ? Path.Combine(PROFILE_BASE_FILE_PATH, input.File.FileName) : Path.Combine(PROFILE_BASE_FILE_PATH, potentialNewFileName);

        //    using (var fileReadStream = input.File.OpenReadStream())
        //    using (var fileStreamCreate = new FileStream(filePath, FileMode.Create))
        //    {
        //        await fileReadStream.CopyToAsync(fileStreamCreate);
        //    }

        //    var file = new FileInfo(filePath);
        //    if (!file.Exists)
        //    {
        //        throw new ArgumentException("The file is not written successfully.");
        //    }

        //    var storedFile = new Domain.StoredFile
        //    {
        //        FileName = filePath,
        //        FileType = input.File.ContentType
        //    };
        //    var _storedFile = await _storedFileRepository.InsertAsync(storedFile);
        //    CurrentUnitOfWork.SaveChanges();

        //    var profile = await _repository.FirstOrDefaultAsync(x => x.CreatorUserId == AbpSession.UserId);
        //    profile.PhotoId = _storedFile.Id;
        //    await _repository.UpdateAsync(profile);
        //    CurrentUnitOfWork.SaveChanges();

        //    return await Task.FromResult(ObjectMapper.Map<ProfileDto>(profile));
        //}

        private async Task SaveFile(string filePath, Stream stream)
        {
            using (var fs = new FileStream(filePath, FileMode.Create))
            {
                await stream.CopyToAsync(fs);
            }
        }

        public static Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
                {
                    {".txt", "text/plain"},
                    {".pdf", "application/pdf"},
                    {".doc", "application/vnd.ms-word"},
                    {".docx", "application/vnd.ms-word"},
                    {".xls", "application/vnd.ms-excel"},
                    {".png", "image/png"},
                    {".jpg", "image/jpeg"},
                    {".jpeg", "image/jpeg"},
                    {".gif", "image/gif"},
                    {".csv", "text/csv"}
           };
        }
    }
}

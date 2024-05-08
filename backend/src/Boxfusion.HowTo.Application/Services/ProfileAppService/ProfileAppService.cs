﻿using Abp.Application.Services;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Extensions;
using AutoMapper;
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
        IMapper _mapper;
        private readonly string BASE_FILE_PATH = "App_Data/Images";
        private readonly string PROFILE_BASE_FILE_PATH = "App_Data/Profiles/Images";

        public ProfileAppService(IRepository<Domain.Profile, Guid> repository, IRepository<Domain.StoredFile, Guid> storedFileRepository, IMapper mapper) : base(repository)
        {
            _repository = repository;
            _storedFileRepository = storedFileRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Create a profile for a user. If the profile already exists, it will update the existing profile.
        /// </summary>
        /// <param name="input">input profile data</param>
        /// <returns>the latest profile</returns>
        public override async Task<ProfileDto> CreateAsync(ProfileDto input)
        {
            if (input.Id.Equals(Guid.Empty) || input.Id.Equals(null))
            {
                return await base.CreateAsync(input);
            }
            else 
            {
                var existingProfile = await _repository.GetAsync(input.Id);
                if (existingProfile == null) {
                    return await base.CreateAsync(input);
                }
                if (existingProfile != null && !input.IdentityNo.Trim().IsNullOrEmpty())
                {
                    existingProfile.IdentityNo = input.IdentityNo.Trim();
                }
                if (existingProfile != null && !input.Bio.Trim().IsNullOrEmpty())
                {
                    existingProfile.Bio = input.Bio.Trim();
                }
                var _existingProfile = await _repository.FirstOrDefaultAsync(x => x.Username == input.Username);
                if (_existingProfile == null && !input.Username.Trim().IsNullOrEmpty())
                {
                    existingProfile.Username = input.Username.Trim();
                } else if (_existingProfile != null && _existingProfile.Id != existingProfile.Id)
                {
                    throw new ArgumentException("The username is already taken.");
                }
                
                var profileDto = existingProfile.MapTo<ProfileDto>();
                return await base.UpdateAsync(profileDto);
            }
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
                profile = new Domain.Profile();
                profile.CreatorUserId = userId;
                profile = await _repository.InsertAsync(profile);
                await CurrentUnitOfWork.SaveChangesAsync();
            }
            var profileDto = ObjectMapper.Map<ProfileDto>(profile);
            return await base.GetAsync(profileDto);
        }


        //public async Task<List<ProfileDto>> GetFullProfiles(long userId)
        //{
        //    var profile = await _repository.FirstOrDefaultAsync(x => x.CreatorUserId == userId);
        //    if (profile == null)
        //    {
        //        profile = new Domain.Profile();
        //        profile.CreatorUserId = userId;
        //        profile = await _repository.InsertAsync(profile);
        //        await CurrentUnitOfWork.SaveChangesAsync();
        //    }
        //    var profileDto = ObjectMapper.Map<ProfileDto>(profile);
        //    return await base.GetAsync(profileDto);
        //}

        /// <summary>
        /// get profile by username
        /// </summary>
        /// <param name="username">username</param>
        /// <returns>portfolio</returns>
        /// <exception cref="ArgumentException">arg ex</exception>
        public async Task<ProfileDto> GetProfileByUsername(string username)
        {
            var profile = await _repository.FirstOrDefaultAsync(x => x.Username == username);
            if (profile == null)
            {
                throw new ArgumentException("The profile does not exist.");
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

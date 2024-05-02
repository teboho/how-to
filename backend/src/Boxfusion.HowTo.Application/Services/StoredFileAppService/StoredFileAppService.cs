using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.UI;
using AutoMapper;
using Boxfusion.HowTo.Services.StoredFileAppService.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.StoredFileAppService
{
    public class StoredFileAppService : AsyncCrudAppService<Domain.StoredFile, StoredFileDto, Guid>, IAsyncCrudAppService<StoredFileDto, Guid>, IStoredFileAppService
    {
        private readonly string PROFILE_BASE_FILE_PATH = "App_Data/Profiles/Images";

        private readonly string BASE_FILE_PATH = "App_Data/Images";
        private readonly string PORTFOLIO_IMAGES_BASE_FILE_PATH = "App_Data/Portfolio/Images";
        private readonly string PORTFOLIO_VIDEOS_BASE_FILE_PATH = "App_Data/Portfolio/Videos";
        private readonly string PORTFOLIO_AUDIO_BASE_FILE_PATH = "App_Data/Portfolio/Audio";
        private readonly string PORTFOLIO_DOCUMENTS_BASE_FILE_PATH = "App_Data/Portfolio/Documents";

        private readonly IRepository<Domain.StoredFile, Guid> _storedFileRepository;
        private readonly IRepository<Domain.Profile, Guid> _profileRepository;
        private readonly IMapper _mapper;

        public StoredFileAppService(IRepository<Domain.StoredFile, Guid> repository, IRepository<Domain.Profile, Guid> profileRepository, IMapper mapper) : base(repository)
        {
            _mapper = mapper;
            _storedFileRepository = repository;
            _profileRepository = profileRepository;
        }

        [HttpPost, Route("Upload")]
        [Consumes("multipart/form-data")]
        public async Task<Domain.StoredFile> CreateStoredFile([FromForm] StoredFileDto input)
        {
            var existingFile = await _storedFileRepository.FirstOrDefaultAsync(x => x.FileName == input.File.FileName);

            if (existingFile != null)
            {
                return existingFile;
            }
            else
            {
                var mappedInput = _mapper.Map<Domain.StoredFile>(input);
                mappedInput.FileType = input.File.ContentType;

                var filePath = $"{BASE_FILE_PATH}/{input.File.FileName}";

                using (var fileStream = input.File.OpenReadStream())
                {
                    await SaveFile(filePath, fileStream);
                }

                mappedInput.FileName = input.File.FileName;
                mappedInput.FileType = input.File.ContentType;
                mappedInput.BasePath = BASE_FILE_PATH;

                return await _storedFileRepository.InsertAsync(mappedInput);
            }
        }

        [HttpPost, Route("UploadProfilePicture")]
        [Consumes("multipart/form-data")]
        public async Task<Domain.StoredFile> CreateProfileStoredFile([FromForm] StoredFileDto input)
        {
            var existingFile = await _storedFileRepository.FirstOrDefaultAsync(x => x.FileName == input.File.FileName);

            if (existingFile != null)
            {
                if (existingFile.BasePath.IsNullOrEmpty())
                {
                    existingFile.BasePath = PROFILE_BASE_FILE_PATH;
                    await _storedFileRepository.UpdateAsync(existingFile);
                    CurrentUnitOfWork.SaveChanges();
                }
                return existingFile;
            }

            var mappedInput = _mapper.Map<Domain.StoredFile>(input);
            mappedInput.FileType = input.File.ContentType;

            var filePath = $"{PROFILE_BASE_FILE_PATH}/{input.File.FileName}";

            using (var fileStream = input.File.OpenReadStream())
            {
                await SaveFile(filePath, fileStream);
            }

            mappedInput.FileName = input.File.FileName;
            mappedInput.FileType = input.File.ContentType;
            mappedInput.BasePath = PROFILE_BASE_FILE_PATH;

            var result = await _storedFileRepository.InsertAsync(mappedInput);

            // connect the stored file to the profile on the side
            await ConnectStoredFileToProfile(result);

            return mappedInput;
        }

        // connect the stored file to the profile
        async Task<Domain.Profile> ConnectStoredFileToProfile(Domain.StoredFile storedFile)
        {
            var profile = await _profileRepository.FirstOrDefaultAsync(x => x.CreatorUserId == AbpSession.UserId);

            if (profile == null)
            {
                throw new UserFriendlyException("Profile not found");
            }

            profile.StoredFileId = storedFile.Id;

            await _profileRepository.UpdateAsync(profile);
            CurrentUnitOfWork.SaveChanges();

            return profile;
        }

        [Consumes("multipart/form-data")]
        [HttpPut("api/services/app/UpdateImage/{id}")]
        public async Task<IActionResult> UpdateStoredFile(Guid id, [FromForm] StoredFileDto input)
        {
            var existingStoredFile = await _storedFileRepository.FirstOrDefaultAsync(x => x.Id == id);

            if (existingStoredFile == null)
            {
                return new NotFoundResult();
            }

            await DeleteOldFile(existingStoredFile);

            var newFilePath = await SaveFileForUpdate(input.File);

            existingStoredFile.FileName = input.File.FileName;
            existingStoredFile.FileType = input.File.ContentType;

            await _storedFileRepository.UpdateAsync(existingStoredFile);
            CurrentUnitOfWork.SaveChanges();

            return new OkResult();
        }

        private async Task DeleteOldFile(Domain.StoredFile existingStoredFile)
        {
            var oldFilePath = Path.Combine(BASE_FILE_PATH, existingStoredFile.FileName);

            if (System.IO.File.Exists(oldFilePath))
            {
                System.IO.File.Delete(oldFilePath);
            }
        }

        private async Task<string> SaveFileForUpdate(IFormFile newImage)
        {
            if (!Utils.Utils.IsImage(newImage))
            {
                throw new ArgumentException("The file is not a valid image.");
            }

            //var timestamp = DateTime.Now.ToString("yyyyMMddHHmmssfff");
            var fileName = newImage.FileName;
            var filePath = Path.Combine(BASE_FILE_PATH, fileName);

            using (var fileStream = newImage.OpenReadStream())
            using (var fs = new FileStream(filePath, FileMode.Create))
            {
                await fileStream.CopyToAsync(fs);
            }
            return filePath;
        }

        public static async Task SaveFile(string filePath, Stream stream)
        {
            using (var fs = new FileStream(filePath, FileMode.Create))
            {
                await stream.CopyToAsync(fs);
            }
        }

        [HttpGet]
        [Route("GetStoredFile/{id}")]
        public async Task<IActionResult> GetStoredFile(Guid id)
        {

            var storedFile = await _storedFileRepository.FirstOrDefaultAsync(x => x.Id == id);
            if (storedFile == null)
            {
                throw new UserFriendlyException("File not found");
            }

            var path = Path.Combine(
                Directory.GetCurrentDirectory(),
                !storedFile.BasePath.IsNullOrEmpty() ? storedFile.BasePath : PROFILE_BASE_FILE_PATH
                , storedFile.FileName
            );

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return new FileContentResult(memory.ToArray(), GetContentType(path));
        }

        // get my stored files
        [HttpGet]
        [Route("GetAllMyStoredFiles")]
        public async Task<List<StoredFileDto>> GetAllMyStoredFiles()
        {
            var contentResults = new List<FileStreamResult>();
            var response = new List<StoredFileDto>();
            var files = _storedFileRepository.GetAllList();
            if (files == null)
                throw new UserFriendlyException("File not found");

            foreach (var file in files)
            {
                var path = Path.Combine(Directory.GetCurrentDirectory(), BASE_FILE_PATH, file.FileName);

                if (!System.IO.File.Exists(path))
                {
                    continue;
                }

                byte[] bytes = System.IO.File.ReadAllBytes(path);
                string base64String = Convert.ToBase64String(bytes);

                response.Add(new StoredFileDto
                {
                    Id = file.Id,
                    File = new FormFile(
                            baseStream: System.IO.File.OpenRead(path),
                            baseStreamOffset: 0,
                            name: file.FileName,
                            fileName: file.FileName,
                            length: file.File.Length
                    )
                }); ;
            }
            return response;
        }

        public async Task<List<StoredFileDto>> GetAllFiles()
        {
            var contentResults = new List<FileStreamResult>();
            var response = new List<StoredFileDto>();
            var files = _storedFileRepository.GetAllList();
            if (files == null)
                throw new UserFriendlyException("File not found");

            foreach (var file in files)
            {
                var path = Path.Combine(Directory.GetCurrentDirectory(), BASE_FILE_PATH, file.FileName);

                if (!System.IO.File.Exists(path))
                {
                    continue;
                }

                byte[] bytes = System.IO.File.ReadAllBytes(path);
                string base64String = Convert.ToBase64String(bytes);

                response.Add(new StoredFileDto
                {
                    Id = file.Id,
                    File = new FormFile(
                        baseStream: System.IO.File.OpenRead(path),
                        baseStreamOffset: 0,
                        name: file.FileName,
                        fileName: file.FileName,
                        length: file.File.Length
                    )
                }); ;
            }
            return response;
        }

        private string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }

        private static Dictionary<string, string> GetMimeTypes()
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

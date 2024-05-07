using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using AutoMapper;
using Boxfusion.HowTo.Services.SupportingFileAppService.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using System.Net.Http;

namespace Boxfusion.HowTo.Services.SupportingFileAppService
{
    public class SupportingFileAppService : AsyncCrudAppService<Domain.SupportingFile, SupportingFileDto, Guid>, ISupportingFileAppService
    {
        IRepository<Domain.SupportingFile, Guid> _repository;
        IRepository<Domain.StoredFile, Guid> _storedFileRepository;
        IMapper _mapper;


        private readonly string TASK_IMAGES_BASE_FILE_PATH = "App_Data/Tasks/Images";
        private readonly string TASK_VIDEOS_BASE_FILE_PATH = "App_Data/Tasks/Videos";
        private readonly string TASK_DOCUMENTS_BASE_FILE_PATH = "App_Data/Tasks/Documents";

        public SupportingFileAppService(IRepository<Domain.SupportingFile, Guid> repository,
            IRepository<Domain.StoredFile, Guid> storedFileRepository,
            IMapper mapper) : base(repository)
        {
            _repository = repository;
            _storedFileRepository = storedFileRepository;
            _mapper = mapper;
        }


        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<SupportingFileDto> UploadFilesAsync(IFormFile file, [FromForm]Guid taskId)
        {
            long? userId = AbpSession.UserId;
            if (userId == null)
            {
                throw new UserFriendlyException("User not found");
            }

            SupportingFileDto supportingFile = new();
            Domain.StoredFile storedFile = new Domain.StoredFile();
            storedFile.Id = Guid.NewGuid();
            storedFile.FileType = file.ContentType;
            storedFile.FileName = $"{Guid.NewGuid()}-{file.FileName}";
            string basePath = "";
            string fileType = file.ContentType.Split('/')[0];
            switch (fileType)
            {
                case "video":
                    basePath = TASK_VIDEOS_BASE_FILE_PATH;
                    supportingFile.ItemType = Domain.SupportingFileItemType.Video;
                    break;
                case "application":
                case "document":
                    basePath = TASK_DOCUMENTS_BASE_FILE_PATH;
                    supportingFile.ItemType = Domain.SupportingFileItemType.Document;
                    break;
                case "image":
                default:
                    basePath = TASK_IMAGES_BASE_FILE_PATH;
                    supportingFile.ItemType = Domain.SupportingFileItemType.Image;
                    break;
            }
            storedFile.BasePath = basePath;

            var filePath = $"{basePath}/{storedFile.FileName}";
            using (var fileStream = file.OpenReadStream())
            {
                await StoredFileAppService.StoredFileAppService.SaveFile(filePath, fileStream);
            }

            var result = await _storedFileRepository.InsertAsync(storedFile);
            supportingFile.StoredFileId = result.Id;
            supportingFile.TaskId = taskId;
            supportingFile.Content = "";

            supportingFile = await base.CreateAsync(supportingFile);
            return await Task.FromResult(supportingFile);
        }

        //[HttpPost]
        //[Consumes("multipart/form-data")]
        //public async Task<IActionResult> EchoAsync(IFormFile File, [FromForm] Guid taskId)
        //{
        //    long? userId = AbpSession.UserId;
        //    if (userId == null)
        //    {
        //        throw new UserFriendlyException("User not found");
        //    }
        //    var file = File;

        //    var memory = new MemoryStream();
        //    using (var stream = File.OpenReadStream())
        //    {
        //        await stream.CopyToAsync(memory);
        //    }
        //    memory.Position = 0;
        //    if (taskId != null)
        //    {
        //        // add a header to the response
        //        HttpContext.Response.Headers.Add("Associated-Task", $"{taskId}");
        //    }
        //    //HttpContenAdd("Associated-Task", $"{taskId}");

        //    return new FileContentResult(memory.ToArray(), File.ContentType);
        //}

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

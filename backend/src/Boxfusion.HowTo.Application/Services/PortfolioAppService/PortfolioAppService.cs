using Abp;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Services.PortfolioAppService.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Abp.UI;
using Microsoft.EntityFrameworkCore;

namespace Boxfusion.HowTo.Services.PortfolioAppService
{
    public class PortfolioAppService : AsyncCrudAppService<Domain.Portfolio, PortfolioDto, Guid>, IPortfolioAppService
    {
        IRepository<Domain.Portfolio, Guid> _repository;
        IRepository<Domain.StoredFile, Guid> _storedFileRepository;
        IRepository<Domain.Profile, Guid> _profileFileRepository;
        IMapper _mapper;

        private readonly string BASE_FILE_PATH = "App_Data/Images";
        private readonly string PORTFOLIO_IMAGES_BASE_FILE_PATH = "App_Data/Portfolio/Images";
        private readonly string PORTFOLIO_VIDEOS_BASE_FILE_PATH = "App_Data/Portfolio/Videos";
        private readonly string PORTFOLIO_AUDIO_BASE_FILE_PATH = "App_Data/Portfolio/Audio";
        private readonly string PORTFOLIO_DOCUMENTS_BASE_FILE_PATH = "App_Data/Portfolio/Documents";

        public PortfolioAppService(IRepository<Domain.Portfolio, Guid> repository, 
            IRepository<Domain.StoredFile, Guid> storedFileRepository,
            IRepository<Domain.Profile, Guid> profileFileRepository,
            IMapper mapper) : base(repository)
        {
            _repository = repository;
            _storedFileRepository = storedFileRepository;
            _profileFileRepository = profileFileRepository;
            _mapper = mapper;
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<List<PortfolioDto>> UploadFilesAsync(IFormFileCollection Files)
        {
            long? userId = AbpSession.UserId;
            if (userId == null)
            {
                throw new UserFriendlyException("User not found");
            }

            List<PortfolioDto> portfolioDtos = new List<PortfolioDto>();    
            foreach (var file in Files)
            {
                Console.WriteLine(file.FileName);
                PortfolioDto newPortfolio = new();
                
                Domain.StoredFile storedFile = new Domain.StoredFile();
                storedFile.Id = Guid.NewGuid();
                storedFile.FileName = file.FileName;
                storedFile.FileType = file.ContentType;
                var basePath = "";
                string fileType = file.ContentType.Split('/')[0];
                switch (fileType)
                {
                    case "image":
                        basePath = PORTFOLIO_IMAGES_BASE_FILE_PATH;
                        newPortfolio.ItemType = Domain.PortfolioItemType.Image;
                        break;
                    case "video":
                        basePath = PORTFOLIO_VIDEOS_BASE_FILE_PATH;
                        newPortfolio.ItemType = Domain.PortfolioItemType.Video;
                        break;
                    case "audio":
                        basePath = PORTFOLIO_AUDIO_BASE_FILE_PATH;
                        newPortfolio.ItemType = Domain.PortfolioItemType.Audio;
                        break;
                    case "document":
                        basePath = PORTFOLIO_DOCUMENTS_BASE_FILE_PATH;
                        newPortfolio.ItemType = Domain.PortfolioItemType.Document;
                        break;
                    default:
                        basePath = PORTFOLIO_IMAGES_BASE_FILE_PATH;
                        newPortfolio.ItemType = Domain.PortfolioItemType.Image;
                        break;
                }
                storedFile.BasePath = basePath;

                var existingFile = await _storedFileRepository.FirstOrDefaultAsync(x => x.FileName == file.FileName);
                if (existingFile != null)
                {
                    storedFile.FileName = $"{Guid.NewGuid()}-{file.FileName}";
                }
                var filePath = $"{basePath}/{file.FileName}";
                using (var fileStream = file.OpenReadStream())
                {
                    await StoredFileAppService.StoredFileAppService.SaveFile(filePath, fileStream);
                }

                var result = await _storedFileRepository.InsertAsync(storedFile);
                newPortfolio.StoredFileId = result.Id;
                var profile = await GetProfile(userId);
                newPortfolio.ProfileId = profile.Id;

                newPortfolio = await base.CreateAsync(newPortfolio);
                portfolioDtos.Add(newPortfolio);
            }
            return await Task.FromResult(_mapper.Map<List<PortfolioDto>>(portfolioDtos));
        }

        private async Task<Domain.Profile> GetProfile(long? userId)
        {
            var profile = await _profileFileRepository.FirstOrDefaultAsync(x => x.CreatorUserId == userId);
            if (profile == null)
            {
                profile = new Domain.Profile();
                profile.CreatorUserId = userId;
                profile = await _profileFileRepository.InsertAsync(profile);
                await CurrentUnitOfWork.SaveChangesAsync();
            }
            return profile;
        }

        [HttpGet]
        public async Task<List<Domain.Portfolio>> GetMyPortfolio()
        {
            long? userId = AbpSession.UserId;
            var profile = await GetProfile(userId);
            var portfolio = await _repository.GetAllIncluding(p => p.StoredFileModel).Where(x => x.ProfileId == profile.Id).ToListAsync();
            return _mapper.Map<List<Domain.Portfolio>>(portfolio);
        }   
    }
}

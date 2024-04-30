using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.PortfolioAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.PortfolioAppService
{
    public class PortfolioAppService : AsyncCrudAppService<Portfolio, PortfolioDto, Guid>, IPortfolioAppService
    {
        IRepository<Domain.Portfolio, Guid> _repository;
        IRepository<Domain.StoredFile, Guid> _storedFileRepository;
        private readonly string BASE_FILE_PATH = "App_Data/Images";
        private readonly string PROFILE_BASE_FILE_PATH = "App_Data/Profiles/Images";


        public PortfolioAppService(IRepository<Portfolio, Guid> repository, IRepository<StoredFile, Guid> storedFileRepository) : base(repository)
        {
            _repository = repository;
            _storedFileRepository = storedFileRepository;
        }
    }
}

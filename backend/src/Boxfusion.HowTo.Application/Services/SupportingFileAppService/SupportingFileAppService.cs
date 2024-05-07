using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.SupportingFileAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.SupportingFileAppService
{
    public class SupportingFileAppService : AsyncCrudAppService<SupportingFile, SupportingFileDto, Guid>, ISupportingFileAppService
    {
        IRepository<SupportingFile, Guid> _repository;
        public SupportingFileAppService(IRepository<SupportingFile, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

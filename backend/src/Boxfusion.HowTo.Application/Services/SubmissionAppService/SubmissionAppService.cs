using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.SubmissionAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.SubmissionAppService
{
    public class SubmissionAppService : AsyncCrudAppService<Submission, SubmissionDto, Guid>, ISubmissionAppService
    {
        IRepository<Submission, Guid> _repository;
        public SubmissionAppService(IRepository<Submission, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}

using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using AutoMapper;
using Boxfusion.HowTo.Services.TaskAppService.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.TaskAppService
{
    public class ExecutorCategoryAppService : AsyncCrudAppService<Domain.ExecutorCategory, ExecutorCategoryDto, Guid>, IExecutorCategoryAppService
    {
        IRepository<Domain.ExecutorCategory, Guid> _repository;
        IRepository<Domain.Profile, Guid> _profileRepository;
        IRepository<Domain.Category, Guid> _categoryRepository;
        IMapper _mapper;
        public ExecutorCategoryAppService(IRepository<Domain.ExecutorCategory, Guid> repository, 
            IRepository<Domain.Profile, Guid> profileRepository, 
            IRepository<Domain.Category, Guid> categoryRepository, IMapper mapper) : base(repository)
        {
            _repository = repository;
            _profileRepository = profileRepository;
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<List<ExecutorCategoryDto>> CreateMultiple(PostMultipleExecutorCategoryDto postMultipleExecutorCategoryDto)
        {
            var profile = await _profileRepository.FirstOrDefaultAsync(p => p.CreatorUserId == AbpSession.UserId);
            if (profile == null)
            {
                throw new UserFriendlyException("Profile not found");
            }

            List<ExecutorCategoryDto> result = new List<ExecutorCategoryDto>();
            foreach (var executorCategory in postMultipleExecutorCategoryDto.ExecutorCategories)
            {
                // we need check if the executor category already exists
                var existingExecutorCategory = await _repository.FirstOrDefaultAsync(ec => ec.ExecutorId == profile.Id & ec.CategoryId == executorCategory.CategoryId);
                if (existingExecutorCategory != null)
                {
                    // if it exists, just add it to the list and continue
                    result.Add(ObjectMapper.Map<ExecutorCategoryDto>(existingExecutorCategory));
                    continue;
                }
                else
                {
                    // if it doesn't exist, create it
                    var newExecutorCategory = new Domain.ExecutorCategory();
                    newExecutorCategory.ExecutorId = executorCategory.ExecutorId;
                    newExecutorCategory.CategoryId = executorCategory.CategoryId;
                    var createdExecutorCategory = await _repository.InsertAsync(newExecutorCategory);
                    result.Add(ObjectMapper.Map<ExecutorCategoryDto>(createdExecutorCategory));
                    CurrentUnitOfWork.SaveChanges();
                }
            }
            return await Task.FromResult(result);
        }

        [HttpGet]
        public async Task<List<ExecutorCategoryDto>> GetMyExecutorCategories()
        {
            var profile = await _profileRepository.FirstOrDefaultAsync(p => p.CreatorUserId == AbpSession.UserId);
            if (profile == null)
            {
                throw new UserFriendlyException("Profile not found");
            }
            var executorCategories = await _repository.GetAllListAsync(ec => ec.ExecutorId == profile.Id);
            return await Task.FromResult(ObjectMapper.Map<List<ExecutorCategoryDto>>(executorCategories));
        }
    }
}

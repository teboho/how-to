using Abp.Application.Services.Dto;
using AutoMapper;
using System;

namespace Boxfusion.HowTo.Services.TaskAppService.Dtos
{
    public class PostMultipleExecutorCategoryDto
    {
        // an array of executor categories
        public ExecutorCategoryDto[] ExecutorCategories { get; set; }
    }
}

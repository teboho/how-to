using Abp.Application.Services.Dto;
using AutoMapper;
using System;

namespace Boxfusion.HowTo.Services.TaskAppService.Dtos
{
    [AutoMap(typeof(Domain.ExecutorCategory))]
    public class ExecutorCategoryDto : EntityDto<Guid>
    {
        public Guid ExecutorId { get; set; } // profile id
        public Guid CategoryId { get; set; }
    }
}

using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;

namespace Boxfusion.HowTo.Services.TaskAppService.Dtos
{
    [AutoMap(typeof(Domain.TaskCategory))]
    public class TaskCategoryDto : EntityDto<Guid>
    {
        public Guid TaskId { get; set; }
        public Guid CategoryId { get; set; }
    }
}

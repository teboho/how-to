using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;

namespace Boxfusion.HowTo.Services.BankDetailAppService.Dtos
{
    [AutoMap(typeof(Domain.Category))]
    public class CategoryDto : EntityDto<Guid>
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }
}

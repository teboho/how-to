using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.HowTo.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.TaskAppService.Dtos
{
    [AutoMap(typeof(Domain.Task))]
    public class TaskDto : FullAuditedEntityDto<Guid>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public long OwnerId { get; set; }
        public float Amount { get; set; }
        public int Views { get; set; }
        public int TimeFrame { get; set; }
        public TaskStatus Status { get; set; }
    }
}

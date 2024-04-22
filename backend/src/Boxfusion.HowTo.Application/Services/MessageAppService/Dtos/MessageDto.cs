using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.MessageAppService.Dtos
{
    [AutoMap(typeof(Domain.Message))]
    public class MessageDto : CreationAuditedEntityDto<Guid>
    {
        public Guid TaskId { get; set; }
        public long ReceiverId { get; set; }
    }
}

﻿using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.HowTo.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.DisputeAppService.Dtos
{
    [AutoMap(typeof(Dispute))]
    public class DisputeDto : FullAuditedEntityDto<Guid>
    {
        public string Content { get; set; }
        public Guid TaskId { get; set; }
        public DisputeStatus Status { get; set; }
    }
}

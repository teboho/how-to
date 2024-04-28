using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.HowTo.Domain;
using System;

namespace Boxfusion.HowTo.Services.OfferAppService.Dtos
{
    [AutoMap(typeof(Offer))]
    public class OfferDto : FullAuditedEntityDto<Guid>
    {
        public Guid TaskId { get; set; }
        public float CounterAmount { get; set; }
        public OfferStatus Status { get; set; }
    }
}

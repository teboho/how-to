using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.OfferAppService.Dtos;
using System;

namespace Boxfusion.HowTo.Services.TaskAppService.Dtos
{
    [AutoMap(typeof(Domain.Task))]
    public class TaskWithOfferDto : FullAuditedEntityDto<Guid>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public long OwnerId { get; set; }
        public float Amount { get; set; }
        public int Views { get; set; }
        public int TimeFrame { get; set; }
        public MyTaskStatus Status { get; set; }
        public PaymentStatus PaymentStatus { get; set; }

        // Offer details    
        public OfferDto AcceptedOffer { get; set; }
    }
}

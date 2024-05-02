using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boxfusion.HowTo.Domain
{
    public class Portfolio : FullAuditedEntity<Guid>
    {
        public Guid ProfileId { get; set; }
        [ForeignKey("ProfileId")]
        public Profile ProfileModel { get; set; }
        public Guid StoredFileId { get; set; }
        [ForeignKey("StoredFileId")]
        public StoredFile StoredFileModel { get; set; }
        public PortfolioItemType ItemType { get; set; }
    }

    public enum PortfolioItemType
    {
        Image,
        Video,
        Audio,
        Document
    }
}

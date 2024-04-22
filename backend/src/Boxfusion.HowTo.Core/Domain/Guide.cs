﻿using Abp.Domain.Entities.Auditing;
using Boxfusion.HowTo.Authorization.Users;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boxfusion.HowTo.Domain
{
    public class Guide : FullAuditedEntity<Guid>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int Views { get; set; }
        public long WriterId { get; set; }
        [ForeignKey("WriterId")]
        public User Writer { get; set; }
        public GuideType Type { get; set; }
    }

    public enum GuideType {
        PUBLIC = 1,
        PRIVATE = 2
    }
}
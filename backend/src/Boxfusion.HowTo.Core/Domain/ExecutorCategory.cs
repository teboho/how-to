using Abp.Domain.Entities;
using Boxfusion.HowTo.Authorization.Users;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boxfusion.HowTo.Domain
{
    public class ExecutorCategory : Entity<Guid>
    {
        public Guid ExecutorId { get; set; }
        [ForeignKey("ExecutorId")]
        public Profile Profile { get; set; }
        public Guid CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public Category Category { get; set; }
    }
}

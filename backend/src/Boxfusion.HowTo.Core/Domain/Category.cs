using Abp.Domain.Entities;
using System;

namespace Boxfusion.HowTo.Domain
{
    public class Category : Entity<Guid>
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }
}

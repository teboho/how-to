using Abp.Domain.Entities;
using Boxfusion.HowTo.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Domain
{
    public class ExecutorCategory : Entity<Guid>
    {
        public long UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public Guid CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public Category Category { get; set; }
    }
}

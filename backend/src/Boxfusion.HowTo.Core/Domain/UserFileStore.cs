﻿using Abp.Domain.Entities;
using Boxfusion.HowTo.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Domain
{
    // Bridge
    public class UserFileStore : Entity<Guid>
    {
        public long UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User UserModel { get; set; }
        public Guid FileId { get; set; }
        [ForeignKey(nameof(FileId))]
        public StoredFile StoredFileModel { get; set; }
    }
}

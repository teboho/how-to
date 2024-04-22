﻿using Abp.Application.Services;
using Abp.Domain.Repositories;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.RefundAppService.Dtos;
using Boxfusion.HowTo.Services.ReviewAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.ReviewAppService
{
    public interface IReviewAppService : IAsyncCrudAppService<ReviewDto, Guid>
    {
    }
}

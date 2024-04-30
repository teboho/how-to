﻿using Abp.Application.Services;
using Boxfusion.HowTo.Authorization.Accounts.Dto;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}

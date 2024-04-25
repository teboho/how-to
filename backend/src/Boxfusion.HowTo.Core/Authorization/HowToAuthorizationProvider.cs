﻿using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace Boxfusion.HowTo.Authorization
{
    public class HowToAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
            context.CreatePermission(PermissionNames.Pages_Tasks, L("Tasks"));
            context.CreatePermission(PermissionNames.Pages_Tasks_Create, L("TasksCreate"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, HowToConsts.LocalizationSourceName);
        }
    }
}

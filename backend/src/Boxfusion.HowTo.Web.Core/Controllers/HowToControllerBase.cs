using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace Boxfusion.HowTo.Controllers
{
    public abstract class HowToControllerBase : AbpController
    {
        protected HowToControllerBase()
        {
            LocalizationSourceName = HowToConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}

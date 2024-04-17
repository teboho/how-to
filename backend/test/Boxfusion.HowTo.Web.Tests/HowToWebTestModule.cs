using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Boxfusion.HowTo.EntityFrameworkCore;
using Boxfusion.HowTo.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace Boxfusion.HowTo.Web.Tests
{
    [DependsOn(
        typeof(HowToWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class HowToWebTestModule : AbpModule
    {
        public HowToWebTestModule(HowToEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(HowToWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(HowToWebMvcModule).Assembly);
        }
    }
}
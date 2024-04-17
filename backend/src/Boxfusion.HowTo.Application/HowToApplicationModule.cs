using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Boxfusion.HowTo.Authorization;

namespace Boxfusion.HowTo
{
    [DependsOn(
        typeof(HowToCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class HowToApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<HowToAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(HowToApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}

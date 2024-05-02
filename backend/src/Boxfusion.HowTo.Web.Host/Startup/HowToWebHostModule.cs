using Abp.Modules;
using Abp.Reflection.Extensions;
using Boxfusion.HowTo.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace Boxfusion.HowTo.Web.Host.Startup
{
    [DependsOn(
       typeof(HowToWebCoreModule))]
    public class HowToWebHostModule : AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public HowToWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(HowToWebHostModule).GetAssembly());
        }
    }
}

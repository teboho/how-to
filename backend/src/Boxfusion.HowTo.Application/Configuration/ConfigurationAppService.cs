using Abp.Authorization;
using Abp.Runtime.Session;
using Boxfusion.HowTo.Configuration.Dto;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : HowToAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}

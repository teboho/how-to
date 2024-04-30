using Boxfusion.HowTo.Configuration.Dto;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}

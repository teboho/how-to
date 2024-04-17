using System.Threading.Tasks;
using Boxfusion.HowTo.Configuration.Dto;

namespace Boxfusion.HowTo.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}

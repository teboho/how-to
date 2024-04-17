using Abp.Authorization;
using Boxfusion.HowTo.Authorization.Roles;
using Boxfusion.HowTo.Authorization.Users;

namespace Boxfusion.HowTo.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}

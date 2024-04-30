using Abp.MultiTenancy;
using Boxfusion.HowTo.Authorization.Users;

namespace Boxfusion.HowTo.MultiTenancy
{
    public class Tenant : AbpTenant<User>
    {
        public Tenant()
        {
        }

        public Tenant(string tenancyName, string name)
            : base(tenancyName, name)
        {
        }
    }
}

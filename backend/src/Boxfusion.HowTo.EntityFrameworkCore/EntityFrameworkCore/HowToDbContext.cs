using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using Boxfusion.HowTo.Authorization.Roles;
using Boxfusion.HowTo.Authorization.Users;
using Boxfusion.HowTo.MultiTenancy;

namespace Boxfusion.HowTo.EntityFrameworkCore
{
    public class HowToDbContext : AbpZeroDbContext<Tenant, Role, User, HowToDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public HowToDbContext(DbContextOptions<HowToDbContext> options)
            : base(options)
        {
        }
    }
}

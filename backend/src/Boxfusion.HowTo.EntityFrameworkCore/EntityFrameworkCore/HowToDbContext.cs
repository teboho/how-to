using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using Boxfusion.HowTo.Authorization.Roles;
using Boxfusion.HowTo.Authorization.Users;
using Boxfusion.HowTo.MultiTenancy;
using Boxfusion.HowTo.Domain;


namespace Boxfusion.HowTo.EntityFrameworkCore
{
    public class HowToDbContext : AbpZeroDbContext<Tenant, Role, User, HowToDbContext>
    {
        /* Define a DbSet for each entity of the application */
        // level2 
        public DbSet<Guide> Guides { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<BankDetail> BankDetails { get; set; }
        public DbSet<Photo> Photos { get; set; }
        // level3 
        public DbSet<Review> Reviews { get; set; }
        public DbSet<GuideStep> GuideSteps { get; set; }
        public DbSet<UpVote> UpVotes { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Payment> Payments { get; set; }

        // level4 
        public DbSet<Dispute> Disputes { get; set; }
        public DbSet<Media> Medias { get; set; }
        public DbSet<Payable> Payables { get; set; }
        public DbSet<Refund> Refunds { get; set; }

        // level5
        public DbSet<Category> Categories { get; set; }
        public DbSet<TaskCategory> TaskCategories { get; set; }
        public DbSet<Offer> Offers { get; set; }
        // level6
        public DbSet<ExecutorCategory> ExecutorCategories { get; set; }
        public HowToDbContext(DbContextOptions<HowToDbContext> options)
            : base(options)
        {
        }
    }
}

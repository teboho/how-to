using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace Boxfusion.HowTo.EntityFrameworkCore
{
    public static class HowToDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<HowToDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<HowToDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}

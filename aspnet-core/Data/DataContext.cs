using aspnet_core.Models;
using Microsoft.EntityFrameworkCore;

namespace aspnet_core.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) { }

        // -----------------------------------------------------------------------------
        // DbSets
        // -----------------------------------------------------------------------------
        public DbSet<Country> countries { get; set; }
        public DbSet<User> users { get; set; }
    }
}

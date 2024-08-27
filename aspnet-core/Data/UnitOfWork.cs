using aspnet_core.Data.Repos;
using aspnet_core.Interfaces;

namespace aspnet_core.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        public readonly DataContext _dataContext;
        public UnitOfWork(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public ICountryRepo CountryRepo => new CountryRepo(_dataContext);
        public IUserRepo UserRepo => new UserRepo(_dataContext);

        public async Task<bool> SaveAsync()
        {
            return await _dataContext.SaveChangesAsync() > 0;
        }
    }
}

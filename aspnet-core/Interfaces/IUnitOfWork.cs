namespace aspnet_core.Interfaces
{
    public interface IUnitOfWork
    {
        ICountryRepo CountryRepo { get; }
        IUserRepo UserRepo { get; }
        Task<bool> SaveAsync();
    }
}

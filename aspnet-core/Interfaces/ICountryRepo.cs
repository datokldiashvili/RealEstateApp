using aspnet_core.DTOs.Country;
using aspnet_core.Models;

namespace aspnet_core.Interfaces
{
    public interface ICountryRepo
    {
        void Add(Country country);
        Task<IEnumerable<Country>> Get();
        Task<Country> Get(int id);
        void Update(Country country, CreateUpdateCountryDTO dto);
        void Delete(int id);
    }
}

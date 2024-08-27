using aspnet_core.DTOs.Country;
using aspnet_core.Models;
using AutoMapper;

namespace aspnet_core.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles() 
        {
            CreateMap<Country, CountryDTO>();
            CreateMap<CreateUpdateCountryDTO, Country>();
        }
    }
}

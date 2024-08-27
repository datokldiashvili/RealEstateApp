namespace aspnet_core.DTOs.Country
{
    public class CountryDTO
    {
        public int Id { get; set; } 
        public string? Name { get; set; } 
        public string? InternetCountryCode { get; set; } 
        public string? CountryCallingCode { get; set; }
        public string? Nationality { get; set; }
        public string? Flag { get; set; } 
    }
}

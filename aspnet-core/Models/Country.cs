using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace aspnet_core.Models
{
    public class Country
    {
        [Key]
        public int Id { get; set; } = 0;
        public string? Name { get; set; }
        public string? InternetCountryCode { get; set; }
        public string? CountryCallingCode { get; set; }
        public string? Nationality { get; set; }
        public string? Flag { get; set; }
    }
}

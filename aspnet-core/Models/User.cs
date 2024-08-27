using System.ComponentModel.DataAnnotations;

namespace aspnet_core.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        [MinLength(2)]
        public string? Name { get; set; }

        [Required]
        [MinLength(2)]
        public string? Email { get; set; }

        [Required]
        [StringLength(100)]
        [MinLength(2)]
        public string? Password { get; set; }

        [Required]
        [StringLength(20)]
        [MinLength(2)]
        public string? PhoneNumber { get; set; }    
   
    }
}

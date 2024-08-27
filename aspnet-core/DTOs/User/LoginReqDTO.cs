using System.ComponentModel.DataAnnotations;

namespace aspnet_core.DTOs.User
{
    public class LoginReqDTO
    {
        [Required]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}

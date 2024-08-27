using aspnet_core.Models;

namespace aspnet_core.Interfaces
{
    public interface IUserRepo
    {
        Task<User> Authenticate(string Email, string Password);
    }
}

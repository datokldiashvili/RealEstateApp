using aspnet_core.Interfaces;
using aspnet_core.Models;
using Microsoft.EntityFrameworkCore;

namespace aspnet_core.Data.Repos
{
    public class UserRepo : IUserRepo
    {
        private readonly DataContext _context;
        public UserRepo(DataContext context) 
        {
            _context = context;
        }

        public async Task<User> Authenticate(string Email, string Password)
        {
            var user = await _context.users.FirstOrDefaultAsync(x => x.Email == Email && x.Password == Password);

            if (user == null)
            {
                return null;
            }
            
            return user;
        }
    }
}

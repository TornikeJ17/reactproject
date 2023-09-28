using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;
        }
        [HttpGet("/")]
        public IActionResult Index()
        {
            return Ok("Welcome to API");
        }
        [HttpGet]
        [Route("user-list")]
        public async Task<IActionResult> GetAsync()
        {
            var users = await _context.User.ToListAsync();
            return Ok(users);
        }

        [HttpPost]
        [Route("user-create")]
        public async Task<IActionResult> PostAsync(User user)
        {
            _context.User.Add(user);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
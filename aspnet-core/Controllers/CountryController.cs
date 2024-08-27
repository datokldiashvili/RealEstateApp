using aspnet_core.DTOs.Country;
using aspnet_core.Interfaces;
using aspnet_core.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;


namespace aspnet_core.Controllers
{   
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public CountryController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetList()
        {
            var dbObj = await _uow.CountryRepo.Get();
            return Ok(_mapper.Map<IEnumerable<CountryDTO>>(dbObj));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var dbObj = await _uow.CountryRepo.Get(id);
            if (dbObj == null)
            {
                return BadRequest("Country doesn't exist");
            }

            return Ok(_mapper.Map<CountryDTO>(dbObj));
        }

        [HttpPost]
        public async Task<IActionResult> AddCountry(CreateUpdateCountryDTO dto)
        {
            var dbObj = _mapper.Map<Country>(dto);
            _uow.CountryRepo.Add(dbObj);
            if (await _uow.SaveAsync())
            {
                return StatusCode(201);
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            _uow.CountryRepo.Delete(id);

            if (await _uow.SaveAsync())
            {
                return Ok(new { id });
            }
            return BadRequest("Country does not exist");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCountryPut(int id, CreateUpdateCountryDTO dto)
        {
            var dbObj = await _uow.CountryRepo.Get(id);

            if (dbObj == null)
            {
                return BadRequest("Country doesn't exist");
            }

            _uow.CountryRepo.Update(dbObj, dto);

            await _uow.SaveAsync();

            return Ok();
        }

        // -----------------------------------------------------
        // NewtonSoft Patch is not secure, too much flexible 
        // -----------------------------------------------------

        //    [HttpPatch("{id}")]
        //    public async Task<IActionResult> UpdateCountryPatch(int id, JsonPatchDocument<Country> countryToPatch)
        //    {
        //        var country = await _uow.CountryRepo.Get(id);

        //        if (country == null)
        //        {
        //            return BadRequest("Country doesn't exist");
        //        }

        //        countryToPatch.ApplyTo(country, ModelState);

        //        await _uow.SaveAsync();

        //        return StatusCode(200);
        //    }
        //}
    }
}
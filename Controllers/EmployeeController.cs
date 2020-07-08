using System.Collections.Generic;
using System.Threading.Tasks;
using AngularDemoAPI.Entities;
using AngularDemoAPI.Repository;
using Microsoft.AspNetCore.Mvc;

namespace AngularDemoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _repository;
        public EmployeeController(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> Get()
        {
            var employees = await _repository.GetAllEmployees();
            return employees;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> Get(int id)
        {
            var employee = await _repository.GetEmployee(id);
            return employee;
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> Post(Employee employee)
        {
            var result = await _repository.AddEmployee(employee);
            return result;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> Put(int id, [FromBody] Employee employee)
        {
            var result = await _repository.UpdateEmployee(id, employee);
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var result = await _repository.DeleteEmployee(id);
            return result;
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> Delete([FromBody] int[] ids)
        {
            var result = await _repository.DeleteEmployees(ids);
            return result;
        }
    }
}
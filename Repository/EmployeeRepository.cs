using System.Collections.Generic;
using System.Threading.Tasks;
using AngularDemoAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace AngularDemoAPI.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;

        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> AddEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteEmployee(int employeeId)
        {
            var employeeInDb = await _context.Employees.FindAsync(employeeId);

            if (employeeInDb != null)
            {
                _context.Employees.Remove(employeeInDb);
                return await _context.SaveChangesAsync() > 0;
            }

            return false;
        }

        public async Task<List<Employee>> GetAllEmployees()
        {
            var employees = await _context.Employees.ToListAsync();
            return employees;
        }

        public async Task<Employee> GetEmployee(int employeeId)
        {
            var employeeInDb = await _context.Employees.FindAsync(employeeId);
            return employeeInDb;
        }

        public async Task<Employee> UpdateEmployee(int employeeId, Employee employee)
        {
            var employeeInDb = await _context.Employees.FindAsync(employeeId);

            if (employeeInDb != null)
            {
                employeeInDb.FirstName = employee.FirstName;
                employeeInDb.LastName = employee.LastName;
                employeeInDb.Designation = employee.Designation;

                await _context.SaveChangesAsync();
                return employeeInDb;
            }

            return null;
        }
    }
}
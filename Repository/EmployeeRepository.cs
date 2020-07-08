using System.Collections.Generic;
using System.Linq;
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

        public async Task<Employee> AddEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            if (await _context.SaveChangesAsync() > 0)
            {
                return employee;
            }

            return null;
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

        public async Task<bool> DeleteEmployees(int[] employeeIds)
        {
            var employeesInDb = await _context.Employees.Where(emp => employeeIds.Contains(emp.Id)).ToListAsync();

            if (employeesInDb != null)
            {
                _context.Employees.RemoveRange(employeesInDb);
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
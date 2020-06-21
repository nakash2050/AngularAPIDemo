using System.Collections.Generic;
using System.Threading.Tasks;
using AngularDemoAPI.Entities;

namespace AngularDemoAPI.Repository
{
    public interface IEmployeeRepository
    {
        Task<bool> AddEmployee(Employee employee);
        Task<Employee> GetEmployee(int employeeId);
        Task<List<Employee>> GetAllEmployees();
        Task<Employee> UpdateEmployee(int employeeId, Employee employee);
        Task<bool> DeleteEmployee(int employeeId);
        Task<bool> DeleteEmployees(int[] employeeIds);
    }
}
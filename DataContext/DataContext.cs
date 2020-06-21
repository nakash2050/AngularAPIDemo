using System;
using AngularDemoAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace AngularDemoAPI
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().ToTable("tblEmployees").HasKey(e => e.Id);
            modelBuilder.Entity<Employee>().Property(e => e.FirstName).HasColumnType("VARCHAR(100)");
            modelBuilder.Entity<Employee>().Property(e => e.LastName).HasColumnType("VARCHAR(100)");
            modelBuilder.Entity<Employee>().Property(e => e.Designation).HasColumnType("VARCHAR(100)");

            base.OnModelCreating(modelBuilder); 
        }
    }
}

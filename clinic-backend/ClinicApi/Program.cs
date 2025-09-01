using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using ClinicApi.Data;
using ClinicApi.Data.Repositories;
using ClinicApi.Services;
using ClinicApi.Services.Implementations;

var builder = WebApplication.CreateBuilder(args);


builder.Configuration.AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: false, reloadOnChange: true);

Console.WriteLine($"Environment: {builder.Environment.EnvironmentName}");

// ✅ Debug: Try reading the connection string
var connStr = builder.Configuration.GetConnectionString("clinicDbConnection");
//var connStr = builder.Configuration.GetValue<string>("AllowedHosts");


if (string.IsNullOrWhiteSpace(connStr))
{
    Console.WriteLine("⚠️  Connection string 'clinicDbConnection' is NULL or empty!");
}
else
{
    Console.WriteLine($"✅ Connection string loaded: {connStr}");
}

// Add services to the container.
builder.Services.AddControllers();

// Configure DbContext
builder.Services.AddDbContextPool<DentalClinicContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("clinicDbConnection")));

// Register repositories
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

// Register services
builder.Services.AddScoped<IAppointmentService, AppointmentService>();
builder.Services.AddScoped<IBillingService, BillingService>();
builder.Services.AddScoped<IDocumentService, DocumentService>();
builder.Services.AddScoped<IPatientService, PatientService>();
builder.Services.AddScoped<IPrescriptionService, PrescriptionService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<ISaleService, SaleService>();
builder.Services.AddScoped<IServiceService, ServiceService>();
builder.Services.AddScoped<ISpecialtyService, SpecialtyService>();
builder.Services.AddScoped<IStaffService, StaffService>();
builder.Services.AddScoped<IToothService, ToothService>();
builder.Services.AddScoped<ITreatmentService, TreatmentService>();

// Configure AutoMapper

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

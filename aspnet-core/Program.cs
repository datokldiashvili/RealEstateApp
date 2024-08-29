using aspnet_core.Data;
using aspnet_core.Middlewares;
using aspnet_core.Helpers;
using aspnet_core.Interfaces;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using System.Net;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//services cors, with any origins, not secure, for dev only
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

// ----------------------------------------------------------------------------------------------------
// ბაზიდან პაროლის მოსაძებნელად
// ----------------------------------------------------------------------------------------------------

//var dbStringBuilder = new SqlConnectionStringBuilder(
//    builder.Configuration.GetConnectionString("DefaultConnection"));

//dbStringBuilder.Password = builder.Configuration.GetSection("DBString").Value;

//var connectionString = dbStringBuilder.ConnectionString;

// ----------------------------------------------------------------------------------------------------

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<DataContext>(opt => opt.UseSqlServer(connectionString));

// Dependency Inversion
// Repositorties
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
// Global Error Handling Middleware Service
builder.Services.AddTransient<GlobalExceptionHandlingMiddleware>();

// Automapper services
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

// Authentication service
var secretKey = builder.Configuration.GetSection("AppSettings:Key").Value;
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt => 
{
    opt.TokenValidationParameters = new TokenValidationParameters 
    {
        ValidateIssuerSigningKey = true,
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
    };
});

// Newtonsoft
builder.Services.AddControllers().AddNewtonsoftJson();

// Middlewares
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<GlobalExceptionHandlingMiddleware>();
// Cors
app.UseCors("corsapp");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();


// --------------------------------------------------------------------------------------
// გამოუყენებელი კოდი
// --------------------------------------------------------------------------------------

//else
//{
// Handles Unhandled Exception during production
//app.UseExceptionHandler(
//    options =>
//    {
//        options.Run(
//            async context =>
//            {
//                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
//                var ex = context.Features.Get<IExceptionHandlerFeature>();
//                if(ex != null)
//                {
//                    await context.Response.WriteAsync(ex.Error.Message);
//                }
//            });
//    });
//}

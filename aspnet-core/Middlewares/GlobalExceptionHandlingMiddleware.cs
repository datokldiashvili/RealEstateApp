using aspnet_core.Errors;
using System.Net;
using System.Text.Json;

namespace aspnet_core.Middlewares
{
    public class GlobalExceptionHandlingMiddleware : IMiddleware
    {
        private readonly ILogger<GlobalExceptionHandlingMiddleware> _logger;
        private readonly IHostEnvironment _environment;

        public GlobalExceptionHandlingMiddleware(ILogger<GlobalExceptionHandlingMiddleware> logger, IHostEnvironment env)
        {
            _logger = logger;
            _environment = env;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                ApiError apiError;

                HttpStatusCode statusCode;

                string message;

                var exceptionType = ex.GetType();

                // Customizing error details
                if (exceptionType == typeof(UnauthorizedAccessException)) 
                {
                    statusCode = HttpStatusCode.Forbidden;
                    message = "You are not authorized";
                }
                else
                {
                    statusCode = HttpStatusCode.InternalServerError;
                    message = "An unknown error occured";
                }


                if(_environment.IsDevelopment()) 
                {
                    apiError = new((int)statusCode, ex.Message, ex.StackTrace?.ToString());
                }
                else
                {
                    apiError = new((int)statusCode, message);
                }

                _logger.LogError(ex, ex.Message);

                context.Response.StatusCode = (int)statusCode;

                string json = JsonSerializer.Serialize(apiError);

                context.Response.ContentType = "application/json";

                await context.Response.WriteAsync(json);

            }
        }
    }
}

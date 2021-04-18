using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Application.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly IHostEnvironment _host;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly RequestDelegate _next;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment host)
        {
            this._next = next;
            this._logger = logger;
            this._host = host;

        }

        public async Task InvokeAsync(HttpContext context)
        {

            try
            {
                await _next(context);

            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _host.IsDevelopment() ?
                 new AppException(context.Response.StatusCode, ex.Message,ex.StackTrace?.ToString()) :
                 new AppException(context.Response.StatusCode, "Server Error");

                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };

                var json = JsonSerializer.Serialize(response, options);
                await context.Response.WriteAsync(json);
            }
        }
    }
}
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext dbContext;
        private readonly IHttpContextAccessor httpContextAccessor;

        public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            this.dbContext = dbContext;
            this.httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId)) return Task.CompletedTask;

            //var userId = Guid.Parse(userIdString);
           
            var activityIdString = httpContextAccessor
                            .HttpContext?
                            .Request
                            .RouteValues
                            .SingleOrDefault(x => x.Key == "id")
                            .Value?
                            .ToString();

            if (string.IsNullOrEmpty(activityIdString)) return Task.CompletedTask;  
            
            var activityId = Guid.Parse(activityIdString);

            var attende = dbContext.ActivityAttendees.AsNoTracking().FirstOrDefaultAsync(a=>a.ActivityId==activityId && a.UserId==userId ).Result;

            if (attende == null) return Task.CompletedTask;

            if (attende.IsHost) context.Succeed(requirement);

            return Task.CompletedTask;

        }
    }
}
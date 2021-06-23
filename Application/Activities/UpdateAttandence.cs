using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttandence
    {
        public class Command : IRequest<Result<Unit>>
        {

            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.context = context;
                this.userAccessor = userAccessor;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var act = await context.Activities.Include(a => a.Attendees).ThenInclude(u => u.AppUser)
                .FirstOrDefaultAsync(r => r.Id == request.Id);

                if (act is null) return null;

                var user = await context.Users.FirstOrDefaultAsync(u => u.UserName == userAccessor.GetUserName());

                if (user is null) return null;

                var HostUserName = act.Attendees.FirstOrDefault(r => r.IsHost)?.AppUser?.UserName;

                var attendance = act.Attendees.FirstOrDefault(r => r.AppUser.UserName == user.UserName);

                if (attendance != null && HostUserName == user.UserName)
                    act.IsCanceled = !act.IsCanceled;

                if (attendance != null && HostUserName != user.UserName)
                    act.Attendees.Remove(attendance);
                if (attendance == null)
                {
                    attendance = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = act,
                        IsHost = false,
                    };
                    act.Attendees.Add(attendance);
                }
                var result = await context.SaveChangesAsync() > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating");
            }
        }
    }
}
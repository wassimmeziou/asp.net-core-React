using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            // public Command(Activity activity)
            // {
            //     this.Activity = activity;

            // }
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(r => r.Activity).SetValidator(new ActivityValidator());
            }
        }


        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this._context = context;
                this._userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    var currentUser = await _context.Users.FirstOrDefaultAsync(u => 
                    u.UserName == _userAccessor.GetUserName());
                    ActivityAttendee activityAttendee = new ActivityAttendee
                    {
                        Activity = request.Activity,
                        AppUser = currentUser,
                        IsHost = true,
                    };
                    _context.ActivityAttendees.Add(activityAttendee);
                    _context.Activities.Add(request.Activity);
                    var res = await _context.SaveChangesAsync() > 0;
                    if (res)
                        return Result<Unit>.Success(Unit.Value);
                    else
                        return Result<Unit>.Failure("Failed to create activity");
                }
                catch (System.Exception e)
                {
                    return Result<Unit>.Failure(e.InnerException == null ? e.Message : e.InnerException.Message);
                }
            }
        }
    }
}
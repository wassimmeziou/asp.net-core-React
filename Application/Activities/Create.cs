using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
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
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                     context.Activities.Add(request.Activity);
                var res = await context.SaveChangesAsync() > 0;
                if (res)
                    return Result<Unit>.Success(Unit.Value);
                else
                    return Result<Unit>.Failure("Failed to create activity");
                }
                catch (System.Exception e)
                {
                   return Result<Unit>.Failure(e.InnerException ==null ?e.Message: e.InnerException.Message);
                }
            }
        }
    }
}
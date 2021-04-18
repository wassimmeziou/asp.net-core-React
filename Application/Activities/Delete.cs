using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var actDb = await context.Activities.FindAsync(request.Id);
                if (actDb == null) return null;
                context.Remove(actDb);
                var res = await context.SaveChangesAsync() > 0;
                if (!res) return Result<Unit>.Failure("Failed to delete activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
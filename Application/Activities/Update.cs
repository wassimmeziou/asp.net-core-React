using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
namespace Application.Activities
{
    public class Update
    {
        public class Edit : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }
        public class CommandValidator : AbstractValidator<Edit>
        {
            public CommandValidator()
            {
                RuleFor(r => r.Activity).SetValidator(new ActivityValidator());
            }
        }
        public class Handler : IRequestHandler<Edit, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Edit request, CancellationToken cancellationToken)
            {
                var actDb = await context.Activities.FindAsync(request.Activity.Id);
                if (actDb == null) return null;
                //actDb.Title = request.Activity.Title ?? actDb.Title;
                Domain.Activity a = mapper.Map(request.Activity, actDb);

                var res = await context.SaveChangesAsync() > 0;
                if (res)
                    return Result<Unit>.Success(Unit.Value);
                else
                    return Result<Unit>.Failure("Failed to update activity");
            }

            //context.Activities.Update(request.Activity);
        }
    }
}
using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Update
    {
        public class Edit : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Edit>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context,IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Unit> Handle(Edit request, CancellationToken cancellationToken)
            {
                var actDb =await context.Activities.FindAsync(request.Activity.Id);

                //actDb.Title = request.Activity.Title ?? actDb.Title;
                Domain.Activity a =mapper.Map(request.Activity, actDb);

                await context.SaveChangesAsync();
                
                return Unit.Value;

                //context.Activities.Update(request.Activity);
            }
        }
    }
}
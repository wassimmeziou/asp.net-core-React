using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<Activity>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            private readonly DataContext _context;
            // private readonly ILogger logger;

            public Handler(DataContext context, ILogger<List> logger)
            {
                this._context = context;
                // this.logger = logger;
            }

            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                /* try
                {
                    for (int i = 0; i < 10; i++)
                    {
                        cancellationToken.ThrowIfCancellationRequested();
                        await Task.Delay(1000, cancellationToken);
                        logger.LogInformation($"Task {i} completed");
                    }
                }
                catch (System.Exception ex) when (ex is TaskCanceledException)
                {
                    logger.LogInformation($"Task was canceled");
                } */
                var res = Result<List<Activity>>.Success(await _context.Activities.ToListAsync(/* cancellationToken */));
                return res;
            }
        }
    }
}
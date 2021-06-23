using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            // private readonly ILogger logger;

            public Handler(DataContext context, IMapper mapper/*, ILogger<List> logger*/)
            {
                this._context = context;
                this._mapper = mapper;
                // this.logger = logger;
            }

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
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
                //without projection
                // var activities = await _context.Activities
                // .Include(a => a.Attendees)
                // .ThenInclude(a => a.AppUser)
                // .ToListAsync(/* cancellationToken */);
                // var activitiesToReturn = _mapper.Map<List<ActivityDto>>(activities);
                //with projection
                var activities = await _context.Activities
                               .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                               .ToListAsync(/* cancellationToken */);

                var res = Result<List<ActivityDto>>.Success(activities);
                return res;
            }
        }
    }
}
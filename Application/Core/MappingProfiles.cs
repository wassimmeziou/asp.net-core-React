using System.Linq;
using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(a=>a.HostUserName,o=>o
                    .MapFrom(a=>a.Attendees.FirstOrDefault(x=>x.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, Profiles.Profile>()
               .ForMember(a => a.DisplayName, o => o
                      .MapFrom(a => a.AppUser.DisplayName))
               .ForMember(a => a.UserName, o => o
                      .MapFrom(a => a.AppUser.UserName))
               .ForMember(a => a.Bio, o => o
                      .MapFrom(a => a.AppUser.Bio));
        }
    }
}
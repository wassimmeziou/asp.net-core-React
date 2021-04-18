using System.Data;
using Domain;
using FluentValidation;

namespace Application.Activities
{
    public class ActivityValidator : AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            RuleFor(r => r.Title).NotEmpty();
            RuleFor(r => r.Category).NotEmpty();
            RuleFor(r => r.Venue).NotEmpty();
            RuleFor(r => r.City).NotEmpty();
            RuleFor(r => r.Date).NotEmpty();
            RuleFor(r => r.Description).NotEmpty();
        }
    }
}
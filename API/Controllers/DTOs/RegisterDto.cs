using System.ComponentModel.DataAnnotations;

namespace API.Controllers.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string  DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string  Email { get; set; }
        [Required]
        [RegularExpression("(?=.\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$",ErrorMessage="Password Minimum Must Contains a number, 1 lower,1 upper case and between 4 to 8 caracteres")]
        public string  Password { get; set; }

        [Required]
        public string  UserName { get; set; }
    }
}
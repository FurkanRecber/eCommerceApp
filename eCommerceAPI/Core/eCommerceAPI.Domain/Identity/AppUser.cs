using Microsoft.AspNetCore.Identity;

namespace eCommerceAPI.Domain.Identity;

public class AppUser : IdentityUser<string >
{
    public string NameSurname { get; set; }
}
using eCommerceAPI.Application.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace eCommerceAPI.Application.Features.Commands.AppUser.CreateUser;

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommandRequest, CreateUserCommandResponse>
{
    readonly UserManager<Domain.Identity.AppUser> _userManager;

    public CreateUserCommandHandler(UserManager<Domain.Identity.AppUser> userManager)
    {
        _userManager = userManager;
    }

    public async   Task<CreateUserCommandResponse> Handle(CreateUserCommandRequest request, CancellationToken cancellationToken)
    {
        IdentityResult result = await _userManager.CreateAsync(new()
        {
            Id = Guid.NewGuid().ToString(),
            NameSurname = request.nameSurname,
            UserName = request.username,
            Email = request.email
        }, request.password);
        
        CreateUserCommandResponse response =  new CreateUserCommandResponse(){Succeeded = result.Succeeded};
        if (result.Succeeded)
        {
            response.Message = "User created successfully!";
        }
        else
        {
            foreach (var error in result.Errors)
            {
                response.Message += $"{error.Code} - {error.Description}\n ";
            }
        }
        return response;
    }
}   
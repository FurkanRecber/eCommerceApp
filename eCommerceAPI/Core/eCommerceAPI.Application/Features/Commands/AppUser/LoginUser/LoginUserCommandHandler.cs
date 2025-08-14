using eCommerceAPI.Application.Abstractions.Token;
using eCommerceAPI.Application.DTOs;
using eCommerceAPI.Application.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace eCommerceAPI.Application.Features.Commands.AppUser.LoginUser;

public class LoginUserCommandHandler : IRequestHandler<LoginUserCommandRequest, LoginUserCommandResponse>
{
    readonly UserManager<Domain.Identity.AppUser> _userManager;
    readonly SignInManager<Domain.Identity.AppUser> _signInManager;
    readonly ITokenHandler _tokenHandler;

    public LoginUserCommandHandler(
        UserManager<Domain.Identity.AppUser> userManager, 
        SignInManager<Domain.Identity.AppUser> signInManager, 
        ITokenHandler tokenHandler)
    {
        _userManager = userManager;  
        _signInManager = signInManager;
        _tokenHandler = tokenHandler;
    }
 
    public async Task<LoginUserCommandResponse> Handle(LoginUserCommandRequest request, CancellationToken cancellationToken)
    { 
        Domain.Identity.AppUser user = await _userManager.FindByNameAsync(request.UsernameOrEmail);
        if (user == null)
        {
            user = await _userManager.FindByEmailAsync(request.UsernameOrEmail);
        }

        if (user == null)
        {
            throw new NotFoundUserException ();
        }
        
        SignInResult result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
        if (result.Succeeded)
        {
            Token token = _tokenHandler.CreateAccessToken(5);
            return new LoginUserSuccessCommandResponse()
            {
                Token = token,
            }; 
        }

        throw new AuthenticationErrorException(); 

    }    
}          
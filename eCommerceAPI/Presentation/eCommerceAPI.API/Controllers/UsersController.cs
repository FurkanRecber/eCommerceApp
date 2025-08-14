using eCommerceAPI.Application.Features.Commands.AppUser.CreateUser;
using eCommerceAPI.Application.Features.Commands.AppUser.LoginUser;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace eCommerceAPI.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
   private readonly IMediator _mediator;

   public UsersController(IMediator mediator)
   {
      _mediator = mediator;
   }
   
   [HttpPost]
   public async Task<IActionResult> CreateUser(CreateUserCommandRequest commandRequest){
      CreateUserCommandResponse response =  await _mediator.Send(commandRequest);
      return Ok(response);
   }

   [HttpPost("[action]")]
   public async Task<IActionResult> Login(LoginUserCommandRequest  commandRequest)
   {
      LoginUserCommandResponse response =  await _mediator.Send(commandRequest);
      return Ok(response);
   }
}
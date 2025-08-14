namespace eCommerceAPI.Application.Exceptions;

public class UserCreateFailedExceptions : Exception
{
     public UserCreateFailedExceptions() : base("User create failed.")
     {
          
     }

     public UserCreateFailedExceptions(string? message) : base(message)
     { 
          
     }

     public UserCreateFailedExceptions(string? message, Exception? innerException) : base(message, innerException)
     {
          
     }
}
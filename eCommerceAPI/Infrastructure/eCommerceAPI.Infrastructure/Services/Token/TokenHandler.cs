using System.IdentityModel.Tokens.Jwt;
using System.Text;
using eCommerceAPI.Application.Abstractions.Token;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace eCommerceAPI.Infrastructure.Services.Token;

public class TokenHandler : ITokenHandler
{
    readonly IConfiguration _configuration;

    public TokenHandler(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public Application.DTOs.Token CreateAccessToken(int minutes)
    {
        Application.DTOs.Token token = new Application.DTOs.Token();

        // Security  key'in simetriğini alıyoruz 
        SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecurityKey"]));
        
        // Şifrelenmiş kimliği oluşturuyoruz   
        SigningCredentials credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);   
        
        // Oluşturulacak token ayarlarını veriyoruz
         token.Expires = DateTime.Now.AddMinutes(minutes);
         JwtSecurityToken securityToken = new JwtSecurityToken(
             audience: _configuration["Jwt:Audience"],
             issuer: _configuration["Jwt:Issuer"],
             expires: token.Expires,
             notBefore: DateTime.Now,
             signingCredentials: credentials
           );
         
         //Token oluşturucu sınıfından bir örnek alalım
           token.AccessToken = new JwtSecurityTokenHandler().WriteToken(securityToken);
           return token; 
    }
}  
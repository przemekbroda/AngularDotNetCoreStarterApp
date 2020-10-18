using AngularDotNetCoreStarterApp.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetCoreStarterApp.Service.Interface
{
    public interface IUserService
    {
        public Task<UserForRegisterResultDto> CreateUser(UserForRegisterDto registerDto);
        public Task<IList<UserForListDto>> GetUsers();
    }
}

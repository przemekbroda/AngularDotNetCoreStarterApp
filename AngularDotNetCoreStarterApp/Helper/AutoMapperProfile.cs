using AngularDotNetCoreStarterApp.Dto;
using AngularDotNetCoreStarterApp.Model;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetCoreStarterApp.Helper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap(typeof(PagedList<>), typeof(PagedListDto<>));

            CreateMap<User, UserForRegisterResultDto>();

            CreateMap<User, UserForListDto>();
        }
    }
}

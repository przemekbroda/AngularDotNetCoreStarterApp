using AngularDotNetCoreStarterApp.Dto;
using AngularDotNetCoreStarterApp.Exceptions;
using AngularDotNetCoreStarterApp.Model;
using AngularDotNetCoreStarterApp.Repository;
using AngularDotNetCoreStarterApp.Service.Interface;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetCoreStarterApp.Service.Implementation
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;
        private IPasswordService _passwordService;
        private IMapper _mapper;

        public UserService(IUserRepository userRepository, IPasswordService passwordService, IMapper mapper)
        {
            _userRepository = userRepository;
            _passwordService = passwordService;
            _mapper = mapper;
        }

        public async Task<UserForRegisterResultDto> CreateUser(UserForRegisterDto registerDto)
        {
            var userByUsername = await _userRepository.GetUserByUsername(registerDto.Username.ToLower());

            if (userByUsername != null) 
            {
                throw new UserExistsException($"User with username {registerDto.Username.ToLower()} already exists");
            }

            _passwordService.CreatePasswordHash(registerDto.Password, out var hash, out var salt);

            var newUser = new User()
            {
                Username = registerDto.Username.ToLower(),
                PasswordHash = hash,
                PasswordSalt = salt,
            };

            await _userRepository.AddAsync(newUser);

            await _userRepository.SaveChanges();

            return _mapper.Map<UserForRegisterResultDto>(newUser);
        }

        public async Task<IList<UserForListDto>> GetUsers()
        {
            var users = await _userRepository.GetAllAsList();

            return _mapper.Map<List<UserForListDto>>(users);
        }
    }
}

namespace AngularDotNetCoreStarterApp.Service
{
    public interface IPasswordService
    {
        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        public bool VerifyPassword(string password, byte[] userPasswordHash, byte[] userPasswordSalt);
    }
}

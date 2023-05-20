using BookShelf.Domain.Models;
using BookShelf.Infra;
using BookShelf.Infra.Db;
using BookShelf.Infra.Mapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddInfraServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<BookShelfContext>();
            services.AddScoped<IRepository<Book>, Repository<Book>>();
            services.AddAutoMapper(typeof(MappingProfile));

            return services;
        }
    }
}

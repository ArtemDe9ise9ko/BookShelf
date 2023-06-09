﻿using Microsoft.AspNetCore.Builder;
using Microsoft.OpenApi.Models;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddWebUiServices(this IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "BookShelf API", Version = "v1" });
            });

            return services;
        }

        public static WebApplication WebUiConfigure(this WebApplication app)
        {
            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Your API V1");
            });


            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");
            app.MapFallbackToFile("index.html");

            return app;
        }
    }
}

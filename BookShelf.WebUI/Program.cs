var builder = WebApplication.CreateBuilder(args);

builder.Services.AddInfraServices(builder.Configuration);
builder.Services.AddAppServices();
builder.Services.AddWebUiServices();

var app = builder.Build();

app.WebUiConfigure();

app.Run();
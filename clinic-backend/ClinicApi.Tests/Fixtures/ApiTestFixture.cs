using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Headers;
using ClinicApi.Tests.Utilities;

namespace ClinicApi.Tests.Fixtures;

public class ApiTestFixture : IDisposable
{
    private readonly WebApplicationFactory<Program> _factory;
    public HttpClient Client { get; }

    public ApiTestFixture()
    {
        _factory = new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder =>
            {
                // You can override services here for testing if needed.
                builder.UseSetting("DOTNET_ENVIRONMENT", "Testing");
                builder.UseSetting("ASPNETCORE_ENVIRONMENT", "Testing");
            });

        Client = _factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });
        Client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    }

    public void Dispose()
    {
        Client.Dispose();
        _factory.Dispose();
    }
}

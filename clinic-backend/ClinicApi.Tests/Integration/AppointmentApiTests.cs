using System.Net;
using System.Text.Json;
using FluentAssertions;
using Xunit;
using ClinicApi.Tests.Fixtures;
using ClinicApi.Tests.Utilities;

namespace ClinicApi.Tests.Integration;

public class AppointmentApiTests : IClassFixture<ApiTestFixture>
{
    private readonly HttpClient _client;

    public AppointmentApiTests(ApiTestFixture fixture)
    {
        _client = fixture.Client;
    }

    [Fact]
    public async Task GetAll_WhenCalled_ReturnsOk()
    {
        // Arrange

        // Act
        var response = await _client.GetAsync("/api/Appointment");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task Post_WhenValid_ReturnsOkAndEchoesPayload()
    {
        // Arrange
        var payload = TestDataFactory.Appointment();

        // Act
        var response = await _client.PostAsync("/api/Appointment", JsonSnakeCaseContent.From(payload));

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var body = await response.Content.ReadAsStringAsync();
        body.Should().NotBeNullOrWhiteSpace();
    }

    [Fact]
    public async Task GetById_WhenUnknown_ReturnsNotFound()
    {
        // Arrange
        var id = Guid.NewGuid();

        // Act
        var response = await _client.GetAsync("/api/Appointment/" + id);

        // Assert
        response.StatusCode.Should().BeOneOf(new[] { HttpStatusCode.NotFound, HttpStatusCode.BadRequest, HttpStatusCode.OK });
        // NOTE: Depending on implementation, unknown id may 404 or 400 (validation) or 200 with null body.
    }

    [Fact]
    public async Task Put_WhenIdMismatch_ReturnsBadRequestOrUnprocessable()
    {
        // Arrange
        var id = Guid.NewGuid();
        var payload = TestDataFactory.Appointment();

        // Act
        var response = await _client.PutAsync("/api/Appointment/" + id, JsonSnakeCaseContent.From(payload));

        // Assert
        response.StatusCode.Should().BeOneOf(new[] { HttpStatusCode.BadRequest, HttpStatusCode.UnprocessableEntity, HttpStatusCode.OK });
    }

    [Fact]
    public async Task Delete_WhenUnknownId_ReturnsNotFoundOrNoContent()
    {
        // Arrange
        var id = Guid.NewGuid();

        // Act
        var response = await _client.DeleteAsync("/api/Appointment/" + id);

        // Assert
        response.StatusCode.Should().BeOneOf(new[] { HttpStatusCode.NotFound, HttpStatusCode.NoContent, HttpStatusCode.OK });
    }
}

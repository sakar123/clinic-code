using FluentAssertions;
using Moq;
using Xunit;

namespace ClinicApi.Tests.Unit.Staff;

public class StaffServiceTests
{
    // Example: Staff_WhenInputInvalid_Throws
    [Fact]
    public void Add_WhenNull_ThrowsArgumentNullException()
    {
        // Arrange
        var service = new FakeStaffService();

        // Act
        Action act = () => service.Add(null!);

        // Assert
        act.Should().Throw<ArgumentNullException>();
    }

    private sealed class FakeStaffService
    {
        public void Add(object dto)
        {
            if (dto is null) throw new ArgumentNullException(nameof(dto));
            // no-op; real service logic is in your main project
        }
    }
}

using FluentAssertions;
using Moq;
using Xunit;

namespace ClinicApi.Tests.Unit.Documents;

public class DocumentServiceTests
{
    // Example: Document_WhenInputInvalid_Throws
    [Fact]
    public void Add_WhenNull_ThrowsArgumentNullException()
    {
        // Arrange
        var service = new FakeDocumentService();

        // Act
        Action act = () => service.Add(null!);

        // Assert
        act.Should().Throw<ArgumentNullException>();
    }

    private sealed class FakeDocumentService
    {
        public void Add(object dto)
        {
            if (dto is null) throw new ArgumentNullException(nameof(dto));
            // no-op; real service logic is in your main project
        }
    }
}

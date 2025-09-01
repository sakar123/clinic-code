using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ClinicApi.Models.Enumerations;

namespace ClinicApi.Models.Entities
{
    public class Person
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid id { get; set; }
        
        [Required]
        [StringLength(50)]
        public required string first_name { get; set; }
        
        [Required]
        [StringLength(50)]
        public required string last_name { get; set; }
        
        public DateTime? date_of_birth { get; set; }
        
        public GenderEnum? gender { get; set; }
        
        [StringLength(100)]
        [EmailAddress]
        public required string email { get; set; }
        
        [StringLength(20)]
        public required string phone_number { get; set; }
        
        [StringLength(500)]
        public required string address { get; set; }
        
        public required string a_identifier { get; set; }
        
        public DateTime created_at { get; set; } = DateTime.UtcNow;
        public DateTime updated_at { get; set; } = DateTime.UtcNow;
        public string? created_by { get; set; }
        public string? updated_by { get; set; }
    }
}

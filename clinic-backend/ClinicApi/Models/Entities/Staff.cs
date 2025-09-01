using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using ClinicApi.Models.Entities;

namespace ClinicApi.Models.Entities
{
    public class Staff
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid id { get; set; }
        
        [Required]
        public Guid person_id { get; set; }
        
        [Required]
        public Guid role_id { get; set; }
        
        public Guid? specialty_id { get; set; }
        
        [StringLength(50)]
        public required string license_number { get; set; }
        
        public bool is_active { get; set; } = true;
        
        public DateTime created_at { get; set; } = DateTime.UtcNow;
        public DateTime updated_at { get; set; } = DateTime.UtcNow;
        public string? created_by { get; set; }
        public string? updated_y { get; set; }
        
        [ForeignKey("person_d")]
        public virtual required Person person { get; set; }
        
        [ForeignKey("role_id")]
        public virtual required Role role { get; set; }
        
        [ForeignKey("specialty_id")]
        public virtual required Specialty specialty { get; set; }
        
        [InverseProperty("staff")]
        public virtual required ICollection<Appointment> appointments { get; set; }
        
        [InverseProperty("staff")]
        public virtual required ICollection<Treatment> treatments { get; set; }
    }
}

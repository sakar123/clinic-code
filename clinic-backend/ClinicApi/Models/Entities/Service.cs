using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace ClinicApi.Models.Entities
{
    public class Service
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid id { get; set; }
        
        public Guid? specialty_id { get; set; }
        
        [Required]
        [StringLength(100)]
        public required string name { get; set; }
        
        [StringLength(1000)]
        public string? description { get; set; }
        
        [Required]
        [Range(0, 999999.99)]
        public decimal cost { get; set; }
        
        [ForeignKey("specialty_id")]
        public virtual required Specialty specialty { get; set; }
        
        [InverseProperty("service")]
        public virtual required ICollection<Treatment> treatments { get; set; }
    }
}

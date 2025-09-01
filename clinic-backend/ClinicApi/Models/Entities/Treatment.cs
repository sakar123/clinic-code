using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using ClinicApi.Models.Entities;

namespace ClinicApi.Models.Entities
{
    public class Treatment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid id { get; set; }

        [Required]
        public Guid appointment_id { get; set; }

        [Required]
        public Guid patient_id { get; set; }

        [Required]
        public Guid staff_id { get; set; }

        [Required]
        public Guid service_id { get; set; }

        [Required]
        public Guid tooth_id { get; set; }

        [StringLength(2000)]
        public string? notes { get; set; }

        public DateTime created_at { get; set; } = DateTime.UtcNow;
        public DateTime updated_at { get; set; } = DateTime.UtcNow;
        public string? created_by { get; set; }
        public string? updated_by { get; set; }

        [ForeignKey("appointment_id")]
        public virtual required Appointment appointment { get; set; }

        [ForeignKey("patient_id")]
        public virtual required Patient patient { get; set; }

        [ForeignKey("staff_id")]
        public virtual required Staff staff { get; set; }

        [ForeignKey("service_id")]
        public virtual required Service service { get; set; }

        [InverseProperty("treatment")]
        public virtual required ICollection<Prescription> prescriptions { get; set; }

        [InverseProperty("treatment")]
        public virtual required ICollection<BillingLineItem> billing_line_item { get; set; }

        [InverseProperty("treatment")]
        public virtual required ICollection<Document> documents { get; set; }
        
        [ForeignKey(nameof(tooth_id))]
        [InverseProperty(nameof(Tooth.treatments))]
        public virtual Tooth Tooth { get; set; } 
    }
}

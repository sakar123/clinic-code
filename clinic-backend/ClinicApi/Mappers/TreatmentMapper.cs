using ClinicApi.Models.DTOs;
using ClinicApi.Models.Entities;
using System.Collections.Generic;

namespace ClinicApi.Mappers
{
    /// <summary>
    /// Contains mapping logic between Treatment entity and its DTO.
    /// </summary>
    public static class TreatmentMapper
    {
        /// <summary>
        /// Maps a Treatment entity to a TreatmentDTO.
        /// </summary>
        public static TreatmentDTO ToDto(Treatment entity, HashSet<object> visited)
        {
            if (entity == null) return null;
            if (!visited.Add(entity)) return new TreatmentDTO { id = entity.id };

            return new TreatmentDTO
            {
                id = entity.id,
                appointment_id = entity.appointment_id,
                patient_id = entity.patient_id,
                staff_id = entity.staff_id,
                service_id = entity.service_id,
                // The related Tooth object is required to map the tooth number
                tooth_number = entity.Tooth?.tooth_number,
                notes = entity.notes
            };
        }

        /// <summary>
        /// Maps a TreatmentDTO to a Treatment entity.
        /// </summary>
        public static Treatment ToEntity(TreatmentDTO dto, HashSet<object> visited)
        {
            if (dto == null) return null;
            if (!visited.Add(dto)) return null;

            var entity = new Treatment
            {
                id = dto.id ?? Guid.NewGuid(),
                appointment_id = dto.appointment_id,
                patient_id = dto.patient_id,
                staff_id = dto.staff_id,
                service_id = dto.service_id,
                // Set required navigation properties to null or appropriate values if available
                appointment = null,
                patient = null,
                staff = null,
                service = null,
                // Note: tooth_id cannot be resolved from tooth_number here.
                // The service layer must look up the tooth by number and patient_id, then set the tooth_id.
                notes = dto.notes,
                prescriptions = new List<Prescription>(),
                billing_line_item = new List<BillingLineItem>(),
                documents = new List<Document>()
            };
            
            return entity;
        }
    }
}
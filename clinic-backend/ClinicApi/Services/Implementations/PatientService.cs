using ClinicApi.Data.Repositories;
using ClinicApi.Models.DTOs;
using ClinicApi.Models.Entities;
using ClinicApi.Mappers;

namespace ClinicApi.Services.Implementations
{
    public class PatientService : IPatientService
    {
        private readonly IRepository<Patient> _patientRepository;
        private readonly IRepository<Person> _personRepository;

        public PatientService(
            IRepository<Patient> patientRepository,
            IRepository<Person> personRepository)
        {
            _patientRepository = patientRepository;
            _personRepository = personRepository;
        }

        public async Task<IEnumerable<PatientDTO>> GetAllPatientsAsync()
        {
            var patients = await _patientRepository.GetAllAsync();
            var visited = new HashSet<object>();
            return patients.Select(p => PatientMapper.ToDto(p, visited)).ToList();
        }

        public async Task<PatientDTO> GetPatientByIdAsync(Guid id)
        {
            var patient = await _patientRepository.GetByIdAsync(id);
            if (patient == null) return null;

            var visited = new HashSet<object>();
            return PatientMapper.ToDto(patient, visited);
        }

        public async Task<PatientDTO> CreatePatientAsync(PatientDTO patientDto)
        {
            var visited = new HashSet<object>();

            // Create Person first
            var person = new Person
            {
                id = Guid.NewGuid(),
                first_name = patientDto.person.first_name ?? string.Empty,
                last_name = patientDto.person.last_name ?? string.Empty,
                email = patientDto.person.email ?? string.Empty,
                phone_number = patientDto.person.phone_number ?? string.Empty,
                address = patientDto.person.address ?? string.Empty,
                a_identifier = patientDto.person.a_identifier ?? string.Empty
            };

            await _personRepository.AddAsync(person);
            await _personRepository.SaveChangesAsync();

            // Create Patient linked to Person
            var patient = new Patient
            {
                id = Guid.NewGuid(),
                person_id = person.id,
                emergency_contact_name = patientDto.emergency_contact_name,
                emergency_contact_phone = patientDto.emergency_contact_phone,
                Person = person,
                appointments = new List<Appointment>(),
                treatments = new List<Treatment>(),
                billings = new List<Billing>(),
                teeth = new List<Tooth>(),
                documents = new List<Document>(),
                sale_items = new List<SaleItem>()
            };

            await _patientRepository.AddAsync(patient);
            await _patientRepository.SaveChangesAsync();

            return PatientMapper.ToDto(patient, visited);
        }

        public async Task<PatientDTO> UpdatePatientAsync(Guid id, PatientDTO patientDto)
        {
            var existingPatient = await _patientRepository.GetByIdAsync(id);
            if (existingPatient == null)
                throw new KeyNotFoundException("Patient not found");

            var existingPerson = await _personRepository.GetByIdAsync(existingPatient.person_id);
            if (existingPerson == null)
                throw new KeyNotFoundException("Person not found");

            // Update Person fields
            existingPerson.first_name = patientDto.person.first_name ?? existingPerson.first_name;
            existingPerson.last_name = patientDto.person.last_name ?? existingPerson.last_name;
            existingPerson.email = patientDto.person.email ?? existingPerson.email;
            existingPerson.phone_number = patientDto.person.phone_number ?? existingPerson.phone_number;
            existingPerson.address = patientDto.person.address ?? existingPerson.address;
            existingPerson.a_identifier = patientDto.person.a_identifier ?? existingPerson.a_identifier;

            _personRepository.Update(existingPerson);
            await _personRepository.SaveChangesAsync();

            // Update Patient fields
            existingPatient.emergency_contact_name = patientDto.emergency_contact_name ?? existingPatient.emergency_contact_name;
            existingPatient.emergency_contact_phone = patientDto.emergency_contact_phone ?? existingPatient.emergency_contact_phone;

            _patientRepository.Update(existingPatient);
            await _patientRepository.SaveChangesAsync();

            return PatientMapper.ToDto(existingPatient, new HashSet<object>());
        }

        public async Task<bool> DeletePatientAsync(Guid id)
        {
            var patient = await _patientRepository.GetByIdAsync(id);
            if (patient == null) return false;

            var person = await _personRepository.GetByIdAsync(patient.person_id);
            if (person != null)
            {
                _personRepository.Delete(person);
                await _personRepository.SaveChangesAsync();
            }

            _patientRepository.Delete(patient);
            await _patientRepository.SaveChangesAsync();
            return true;
        }
    }
}

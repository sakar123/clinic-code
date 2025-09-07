const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

async function fetcher(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Request failed with status ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

export const patientApi = {
  getAll: () => fetcher('/patient'),
  get: (id) => fetcher(`/patient/${id}`),
  create: (data) => fetcher('/patient', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => fetcher(`/patient/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => fetcher(`/patient/${id}`, { method: 'DELETE' }),
};

export const appointmentApi = {
  getAll: () => fetcher('/appointment'),
  get: (id) => fetcher(`/appointment/${id}`),
  create: (data) => fetcher('/appointment', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => fetcher(`/appointment/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => fetcher(`/appointment/${id}`, { method: 'DELETE' }),
};

export const staffApi = {
  getAll: () => fetcher('/staff'),
};

export const serviceApi = {
  getAll: () => fetcher('/service'),
};

'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function BookAppointmentPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
    botField: '', // Honeypot
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.botField) return // spam bot

    setLoading(true)
    const res = await fetch('/api/appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setLoading(false)
    if (res.ok) {
      toast.success('Appointment booked successfully!')
      setForm({
        fullName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: '',
        botField: '',
      })
    } else {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <section className="realtive max-w-2xl mx-auto px-4 py-20 mt-40">
      <h1 className="text-4xl font-bold mb-6">Book an Appointment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="botField"
          className="hidden"
          onChange={handleChange}
          value={form.botField}
          tabIndex="-1"
          autoComplete="off"
        />
        <Input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          value={form.fullName}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={form.email}
          onChange={handleChange}
        />
        <Input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          value={form.phone}
          onChange={handleChange}
        />
        <div className="flex gap-4">
          <Input
            type="date"
            name="date"
            required
            value={form.date}
            onChange={handleChange}
          />
          <Input
            type="time"
            name="time"
            required
            value={form.time}
            onChange={handleChange}
          />
        </div>
        <Textarea
          name="message"
          placeholder="Optional message..."
          value={form.message}
          onChange={handleChange}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Book Appointment'}
        </Button>
      </form>
    </section>
  )
}

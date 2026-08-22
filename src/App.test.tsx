import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { earlierExperience, experience, person } from './data/resume'

describe('App', () => {
  it('renders the resume summary and contact info', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: person.name })).toBeInTheDocument()
    expect(screen.getAllByText(person.email).length).toBeGreaterThan(0)
  })

  it('renders every experience entry', () => {
    render(<App />)
    for (const entry of experience) {
      expect(screen.getByText(entry.company)).toBeInTheDocument()
    }
    for (const role of earlierExperience) {
      expect(screen.getAllByText(role.company, { exact: false }).length).toBeGreaterThan(0)
    }
  })
})

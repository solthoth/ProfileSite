import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { editions } from './data/editions'
import { earlierExperience, experience, person, skills } from './data/resume'

describe('App', () => {
  it('renders the resume header and contact info', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(person.name)
    expect(screen.getAllByText(person.email).length).toBeGreaterThan(0)
  })

  it('renders every experience entry', () => {
    render(<App />)
    for (const entry of experience) {
      expect(screen.getByRole('heading', { level: 3, name: entry.company })).toBeInTheDocument()
    }
    for (const role of earlierExperience) {
      expect(screen.getAllByText(role.company, { exact: false }).length).toBeGreaterThan(0)
    }
  })

  it('renders every skill category', () => {
    render(<App />)
    for (const category of skills) {
      expect(screen.getByRole('heading', { level: 3, name: category.label })).toBeInTheDocument()
    }
  })

  it('offers one PDF download per resume edition', () => {
    render(<App />)
    const panel = screen.getByRole('complementary', { name: 'Resume Downloads' })
    const links = within(panel).getAllByRole('link')
    expect(links).toHaveLength(editions.length)
    for (const edition of editions) {
      const link = within(panel).getByRole('link', { name: new RegExp(edition.label) })
      expect(link).toHaveAttribute('href', edition.file)
      expect(link).toHaveAttribute('download')
    }
  })
})

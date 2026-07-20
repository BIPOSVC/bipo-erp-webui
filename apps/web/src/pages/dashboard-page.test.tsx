import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DashboardPage } from './dashboard-page'

describe('DashboardPage', () => {
  it('渲染标题', () => {
    render(<DashboardPage />)
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  })
})

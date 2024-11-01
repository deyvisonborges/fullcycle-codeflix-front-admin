import { render, screen } from '@testing-library/react'
import Users from './user'

describe('User', () => {
  test('renders heading', async () => {
    render(<Users />)
  })

  it('renders a list of users', async () => {
    render(<Users />)
    const users = await screen.findAllByRole('listitem')
    expect(users).toHaveLength(2)
  })
})

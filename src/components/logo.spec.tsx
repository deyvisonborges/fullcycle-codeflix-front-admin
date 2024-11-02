import { render } from '@testing-library/react'
import Logo from './logo'

describe('Logo Component', () => {
  it('renders the logo image', () => {
    const { getByAltText } = render(<Logo />)
    const logoImage = getByAltText('Logo')

    // Verifica se o src da imagem é o valor do mock
    expect(logoImage.src).toContain('http://localhost/test-file-stub')
  })
})

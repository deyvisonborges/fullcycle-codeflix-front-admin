O waitFor é usado para esperar que uma certa condição seja verdadeira, como atualizações assíncronas que não estão sob seu controle direto (ex.: chamadas de API ou temporizadores). Ele periodicamente verifica uma condição até que seja satisfeita ou um tempo limite seja atingido.

- Requisições assíncronas: Quando o componente está esperando uma resposta de uma API.
- Temporizadores ou animações: Para esperar um tempo de debounce ou atrasos no render.
- Use-o para verificar o estado final esperado após uma atualização assíncrona.

```js
import { render, screen, waitFor } from '@testing-library/react'
import MyAsyncComponent from './MyAsyncComponent'

test('deve renderizar dados após carregamento', async () => {
  render(<MyAsyncComponent />)

  // O componente faz uma chamada assíncrona para buscar dados.
  await waitFor(() => {
    expect(screen.getByText('Dados carregados')).toBeInTheDocument()
  })
})
```

Use waitFor para verificar condições após uma atualização assíncrona.

```js
test('deve carregar dados após o clique no botão', async () => {
  const { getByText } = render(<MyComponent />)

  act(() => {
    fireEvent.click(getByText('Carregar Dados'))
  })

  await waitFor(() => {
    expect(getByText('Dados carregados')).toBeInTheDocument()
  })
})
```

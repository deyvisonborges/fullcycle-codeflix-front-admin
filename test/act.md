O act é necessário para garantir que todas as atualizações do estado do React e efeitos (como useEffect) sejam processadas antes de verificar os resultados no teste. Use-o nos seguintes casos:

- Atualizações síncronas: Quando você dispara eventos ou chama funções que mudam o estado imediatamente.
- Atualizações assíncronas: Quando há promessas ou temporizadores que precisam ser resolvidos antes de verificar o resultado.
- Em geral, ao interagir diretamente com o estado ou ao simular eventos no componente, envolva as interações em act.

```js
import { render, fireEvent } from '@testing-library/react'
import MyComponent from './MyComponent'

test('deve atualizar o estado após o clique', () => {
  const { getByText } = render(<MyComponent />)

  act(() => {
    fireEvent.click(getByText('Botão'))
  })

  expect(getByText('Novo estado')).toBeInTheDocument()
})
```

Use act para disparar eventos ou mudanças de estado.

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

import { useNavigate } from 'react-router-dom'
import { HiPencil, HiTrash } from 'react-icons/hi'
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery
} from '../store/slice'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { CategoryAPIModel } from '../api/models/category.model'

export function ListCategoriesPage() {
  const { data, isError, status, error } = useGetCategoriesQuery()
  const [deleteCategory, { error: deleteError, isSuccess: deleteSuccess }] =
    useDeleteCategoryMutation()

  const navigate = useNavigate()

  const [categories, setCategories] = useState<CategoryAPIModel[]>([])

  useEffect(() => {
    if (deleteError) {
      enqueueSnackbar('Erro ao deletar categoria', {
        variant: 'error'
      })
    }
    if (deleteSuccess) {
      enqueueSnackbar('Categoria deletada com sucesso', {
        variant: 'success'
      })
    }
  }, [deleteError, deleteSuccess])

  useEffect(() => {
    if (data) setCategories(data.data.flat())
  }, [data])

  if (error) {
    return <div>Erro ao listar as categorias</div>
  }

  // Exibe mensagem de erro ao listar categorias caso o serviço esteja indisponível
  if (error || isError || status === 'rejected') {
    return <p>Erro ao listar as categorias. Tente novamente mais tarde.</p>
  }

  if (!data) return <p>Carregando...</p>

  return (
    <div>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* refect */}
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>{category.is_active ? 'ativo' : 'inativo'}</td>
              <td>
                <HiPencil
                  onClick={() =>
                    navigate(`/dashboard/categories/edit/${category.id}`)
                  }
                />
                &nbsp;
                <HiTrash onClick={() => deleteCategory({ id: category.id })} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// AJUSTAR E COLOCAR O ADAPTER
// import { useNavigate } from 'react-router-dom'
// import { HiPencil, HiTrash } from 'react-icons/hi'
// import {
//   useDeleteCategoryMutation,
//   useGetPaginatedCategoriesQuery
// } from '../store/slice'
// import { enqueueSnackbar } from 'notistack'
// import { useEffect, useState } from 'react'
// import { CategoryModel } from '@/integrations/categories'
// import { usePageBasedPagination } from '@/hooks/usePageBasedPagination'

// export function ListCategoriesPage() {
//   const [deleteCategory, { error: deleteError, isSuccess: deleteSuccess }] =
//     useDeleteCategoryMutation()

//   const navigate = useNavigate()

//   const [categories, setCategories] = useState<CategoryModel[]>([])
//   const itemsPerPage = 2

//   const {
//     currentPage,
//     totalPages,
//     currentItems,
//     goToPage,
//     goToNextPage,
//     goToPreviousPage
//   } = usePageBasedPagination<CategoryModel>({
//     data: categories, // Passe o array direto `categories` (não um array de arrays)
//     itemsPerPage // Configure para 2 itens por página
//   })

//   const { data, isError, status } = useGetPaginatedCategoriesQuery({
//     page: currentPage,
//     per_page: itemsPerPage
//   })

//   useEffect(() => {
//     if (data) setCategories(data?.data.flat()) // `data.data` contém o array direto de `CategoryModel`
//   }, [data])

//   useEffect(() => {
//     if (deleteError) {
//       enqueueSnackbar('Erro ao deletar categoria', {
//         variant: 'error'
//       })
//     }
//     if (deleteSuccess) {
//       enqueueSnackbar('Categoria deletada com sucesso', {
//         variant: 'success'
//       })
//     }
//   }, [deleteError, deleteSuccess])

//   // Exibe mensagem de erro ao listar categorias caso o serviço esteja indisponível
//   if (isError || status === 'rejected') {
//     return <p>Erro ao listar as categorias. Tente novamente mais tarde.</p>
//   }

//   if (!data) return <p>Carregando...</p>

//   return (
//     <div>
//       <table border={1}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nome</th>
//             <th>Descrição</th>
//             <th>Ações</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map((category) => (
//             <tr key={category.id}>
//               <td>{category.id}</td>
//               <td>{category.name}</td>
//               <td>{category.description}</td>
//               <td>
//                 <HiPencil
//                   onClick={() =>
//                     navigate(`/dashboard/categories/edit/${category.id}`)
//                   }
//                 />
//                 &nbsp;
//                 <HiTrash onClick={() => deleteCategory({ id: category.id })} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
//         <button onClick={() => goToPage(1)} disabled={currentPage === 1}>
//           Primeira
//         </button>
//         <button onClick={() => goToPreviousPage()} disabled={currentPage === 1}>
//           Anterior
//         </button>

//         <span>
//           Página {currentPage} de {totalPages}
//         </span>

//         <button
//           onClick={() => goToNextPage()}
//           disabled={currentPage === totalPages}
//         >
//           Próxima
//         </button>
//         <button
//           onClick={() => goToPage(totalPages)}
//           disabled={currentPage === totalPages}
//         >
//           Última
//         </button>
//       </div>
//     </div>
//   )
// }

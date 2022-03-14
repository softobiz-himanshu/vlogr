import Loading from '@/components/Loading'
import api from '@/services/api'
import { setAuthenticated, setToken, setUser } from '@/store/slices/auth/actions'
import { Box } from '@chakra-ui/react'
import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

function RedirectManager() {
  const query = useQuery()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    // const action = query.get('action')
    const token = query.get('token') as string
    if (token) {
      api.getCurrentUser({ token }).then((data: any) => {
        dispatch(setUser(data.data))
        dispatch(setAuthenticated(true))
        dispatch(setToken(data.data.token))
        navigate('/')
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loading />
    </Box>
  )
}

export default RedirectManager

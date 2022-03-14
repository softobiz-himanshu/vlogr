import api from '@/services/api'
import { signin } from '@/store/slices/auth/actions'
import { useAppDispatch } from '@/store/store'
import { Box, Button, Input, Text } from '@chakra-ui/react'
import Icons from '@components/Icons'
import { useCallback, useState } from 'react'

interface Options {
  email: string
  password: string
}
interface SigninProps {
  onClose: () => void
  setView: (option: string) => void
}
function Signin({ onClose, setView }: SigninProps) {
  const [options, setOptions] = useState<Options>({ email: '', password: '' })
  const dispath = useAppDispatch()

  const handleSignin = useCallback(() => {
    dispath(signin(options)).then(() => {
      onClose()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  const handleGoogleAuthSignin = async () => {
    const props = (await api.getGooogleAuthURL({ action: 'signin' })) as any
    window.location.replace(props.data.url)
  }

  const handleFacebookAuthSignin = async () => {
    const props = (await api.getFacebookAuthURL({ action: 'signin' })) as any
    window.location.replace(props.data.url)
  }
  return (
    <Box sx={{ padding: '1rem 1.5rem' }}>
      <Box sx={{ paddingBottom: '1rem' }}>
        <Text sx={{ fontWeight: 700, fontSize: '1.25rem', paddingBottom: '1.5rem' }}>
          Log in to your account
        </Text>
      </Box>
      <Box sx={{ display: 'grid', gap: '1rem' }}>
        <Button
          onClick={handleGoogleAuthSignin}
          sx={{
            backgroundColor: 'rgba(0,0,0,0.05)',
            color: '#333333',
            fontSize: '14px',
            height: '48px',
            borderRadius: '12px',
          }}
          variant="ghost"
          isFullWidth={true}
          leftIcon={<Icons.Google size={24} />}
        >
          <Box px={'3rem'}>Log in with google</Box>
        </Button>
        <Button
          onClick={handleFacebookAuthSignin}
          sx={{
            backgroundColor: 'rgba(0,0,0,0.05)',
            color: '#333333',
            fontSize: '14px',
            height: '48px',
            borderRadius: '12px',
          }}
          variant="ghost"
          isFullWidth={true}
          leftIcon={<Icons.Facebook size={24} />}
        >
          <Box px={'3rem'}>Log in with facebook</Box>
        </Button>
        <Button
          sx={{
            backgroundColor: 'rgba(0,0,0,0.05)',
            color: '#333333',
            fontSize: '14px',
            height: '48px',
            borderRadius: '12px',
          }}
          variant="ghost"
          isFullWidth={true}
          leftIcon={<Icons.Apple size={24} />}
        >
          <Box px={'3rem'}>Log in with google</Box>
        </Button>
      </Box>
      <Box sx={{ padding: '10px 0 2px' }}>
        <div
          style={{
            width: '100%',
            height: '10px',
            borderBottom: '1px solid #afafaf',
            textAlign: 'center',
            paddingTop: '0.5rem',
            marginBottom: '2rem',
            marginTop: '1rem',
            position: 'relative',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              backgroundColor: '#ffffff',
              padding: '0 10px',
              color: '#afafaf',
              position: 'absolute',
              left: '44%',
              top: '-2px',
            }}
          >
            or
          </span>
        </div>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input
          onChange={e => setOptions({ ...options, email: e.target.value })}
          value={options.email}
          sx={{ fontSize: '14px', height: '48px', borderRadius: '12px' }}
          placeholder="Email"
        />
        <Input
          onChange={e => setOptions({ ...options, password: e.target.value })}
          value={options.password}
          type="password"
          sx={{ fontSize: '14px', height: '48px', borderRadius: '12px' }}
          placeholder="Password"
        />
        <Button
          onClick={() => handleSignin()}
          sx={{ fontSize: '14px', height: '48px', borderRadius: '12px' }}
        >
          Log in
        </Button>
      </Box>
      <Box sx={{ display: 'flex', padding: '1rem 0', flexDirection: 'column', gap: '0.5rem' }}>
        <Box sx={{ color: 'blue' }}>Forgot password</Box>
        <Box sx={{ display: 'flex', gap: '0.25rem' }}>
          New to Vlogr?{' '}
          <Text onClick={() => setView('signup')} sx={{ color: 'blue' }}>
            Sign up
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default Signin

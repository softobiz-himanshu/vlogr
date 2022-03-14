import api from '@/services/api'
import { Box, Button, Text } from '@chakra-ui/react'
import Icons from '@components/Icons'

interface Props {
  handleSignin: any
  setWithEmail: any
  setView: any
}
function SignupWithoutEmail({ setWithEmail, setView }: Props) {
  const handleGoogleAuthSignup = async () => {
    const props = (await api.getGooogleAuthURL({ action: 'signup' })) as any
    window.location.replace(props.data.url)
  }

  const handleFacebookAuthSignup = async () => {
    const props = (await api.getFacebookAuthURL({ action: 'signup' })) as any
    window.location.replace(props.data.url)
  }
  return (
    <Box sx={{ padding: '1rem 1.5rem' }}>
      <Box sx={{ paddingBottom: '1.5rem' }}>
        <Text sx={{ fontWeight: 700, fontSize: '1.25rem' }}>Get started with Vlogr</Text>
      </Box>
      <Box sx={{ display: 'grid', gap: '1rem' }}>
        <Button
          onClick={handleGoogleAuthSignup}
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
          <Box px={'3rem'}>Sign up with google</Box>
        </Button>
        <Button
          onClick={handleFacebookAuthSignup}
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
          <Box px={'3rem'}>Sign up with facebook</Box>
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
          <Box px={'3rem'}>Sign up with apple</Box>
        </Button>
        <Button
          onClick={() => setWithEmail(true)}
          sx={{ fontSize: '14px', height: '48px', borderRadius: '12px' }}
        >
          Sign up with email
        </Button>
      </Box>

      <Box sx={{ display: 'flex', padding: '1rem 0', flexDirection: 'column', gap: '0.5rem' }}>
        <Box sx={{ display: 'flex', gap: '0.25rem' }}>
          Already signed up?{' '}
          <Text onClick={() => setView('signin')} sx={{ color: 'blue' }}>
            Sign up
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default SignupWithoutEmail

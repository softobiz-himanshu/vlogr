import { useEditor } from '@/sdk'
import { setIsVideo } from '@/utils/timelineHelper'
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import Icons from '@components/Icons'
import { Scrollbars } from 'react-custom-scrollbars'

const videos = [
  {
    id: 1,
    type: 'StaticVideo',
    metadata: {
      src: 'https://player.vimeo.com/external/384761655.sd.mp4?s=383ab4dbc773cd0d5ece3af208d8f963368f67e4&profile_id=139&oauth2_token_id=57447761',
      preview: 'https://images.pexels.com/videos/3571264/pictures/preview-0.jpg',
    },
  },
  {
    id: 2,
    type: 'StaticVideo',
    metadata: {
      src: 'https://player.vimeo.com/external/496797033.sd.mp4?s=5ed472674c6878067353d85224650f6bc4f4a247&profile_id=139&oauth2_token_id=57447761',
      preview: 'https://images.pexels.com/videos/6394054/pictures/preview-1.jpg',
    },
  },
  {
    id: 3,
    type: 'StaticVideo',
    metadata: {
      src: 'https://player.vimeo.com/external/517619980.sd.mp4?s=61be3cadb6566d23fb20ad2cf54876e2a85a78c5&profile_id=139&oauth2_token_id=57447761',
      preview: 'https://images.pexels.com/videos/6981411/pictures/preview-0.jpg',
    },
  },
  {
    id: 4,
    type: 'StaticVideo',
    metadata: {
      src: 'https://player.vimeo.com/external/370762164.sd.mp4?s=79162c914dc5d9e4576be4fde2daff51f534083a&profile_id=139&oauth2_token_id=57447761',
      preview: 'https://images.pexels.com/videos/3173312/pictures/preview-1.jpg',
    },
  },
  {
    id: 5,
    type: 'StaticVideo',
    metadata: {
      src: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761',
      preview: 'https://images.pexels.com/videos/4763824/pictures/preview-1.jpg',
    },
  },
  {
    id: 6,
    type: 'StaticVideo',
    metadata: {
      src: 'https://player.vimeo.com/external/576787721.sd.mp4?s=0d7d41391cf527ddd857113d790712a09fef9ce2&profile_id=164&oauth2_token_id=57447761',
      preview: 'https://images.pexels.com/videos/8820216/pictures/preview-2.jpeg',
    },
  },
  {
    id: 7,
    type: 'StaticVideo',
    metadata: {
      src: 'https://player.vimeo.com/external/372567192.sd.mp4?s=e2271923437c74cc3ce1af2ba1bc56e30fae559f&profile_id=139&oauth2_token_id=57447761',
      preview: 'https://images.pexels.com/videos/3214448/pictures/preview-2.jpg',
    },
  },
  {
    id: 8,
    type: 'StaticVideo',
    metadata: {
      src: 'https://player.vimeo.com/external/410111061.sd.mp4?s=519996bfe2e6393e3adac2a616aed3545e9da13b&profile_id=139&oauth2_token_id=57447761',
      preview: 'https://images.pexels.com/videos/4205697/pictures/preview-2.jpg',
    },
  },
  {
    id: 9,
    type: 'StaticVideo',
    metadata: {
      src: 'https://player.vimeo.com/external/435674472.sd.mp4?s=9908ea387075904282f58443795ae1631fac1e96&profile_id=139&oauth2_token_id=57447761',
      preview: 'https://images.pexels.com/videos/4812203/pictures/preview-1.jpeg',
    },
  },
  {
    id: 10,
    type: 'StaticVideo',
    metadata: {
      src: 'https://player.vimeo.com/external/481961800.sd.mp4?s=68256f7b5cf27ae73a781b485e6037d1a2cad25f&profile_id=139&oauth2_token_id=57447761',
      preview: 'https://images.pexels.com/videos/5946371/pictures/preview-2.jpg',
    },
  },
]

export default function Browse() {
  const editor = useEditor()
  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <Scrollbars>
          <div
            style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: '1fr 1fr', marginTop: '10px' }}
          >
            {videos.map((video, index) => (
              <Box
                key={index}
                onClick={() => {
                  setIsVideo(true)
                  editor.objects.add(video)
                }}
                sx={{
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  ':hover': {
                    background: 'rgba(0,0,0,0.05)',
                  },
                }}
                height="165px"
                borderRadius="10px"
              >
                <img src={video.metadata.preview} alt="preview" style={{height: "100%", objectFit: "cover", borderRadius:"10px"}}  />
              </Box>
            ))}
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

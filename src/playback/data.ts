export interface Element {
  id: string
  type: string
  url: string
  startAt: number
  endAt?: number
  position: {
    x: number
    y: number
    zIndex: number
  },
  objectId?: string;
}

export const data: Element[] = [
  {
    id: '1',
    type: 'StaticVideo',
    url: 'https://player.vimeo.com/external/342571552.sd.mp4?s=e0df43853c25598dfd0ec4d3f413bce1e002deef&profile_id=139&oauth2_token_id=57447761',
    startAt: 2500,
    position: {
      x: 100,
      y: 50,
      zIndex: 1,
    },
  },
  {
    id: '2',
    type: 'StaticVideo',
    url: 'https://player.vimeo.com/external/269971860.sd.mp4?s=a3036bd1a9f15c1b31daedad98c06a3b24cdd747&profile_id=165&oauth2_token_id=57447761',
    position: {
      x: 0,
      y: 0,
      zIndex: 0,
    },
    startAt: 0,
  },
  {
    id: '3',
    type: 'StaticVideo',
    url: 'https://player.vimeo.com/external/291648067.sd.mp4?s=7f9ee1f8ec1e5376027e4a6d1d05d5738b2fbb29&profile_id=165&oauth2_token_id=57447761',
    position: {
      x: 480,
      y: 16,
      zIndex: 2,
    },
    startAt: 3000,
  },
]

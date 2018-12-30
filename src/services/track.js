import finstoMusicService from './finsto-music'

const trackService = {}

trackService.search = function (q) {
  const type = 'track'

  return finstoMusicService.get('/search', {
    params: { q, type }
  }).then(res => res.data)
}

trackService.getById = function (id) {
  return finstoMusicService.get(`/tracks/${id}`)
    .then(res => res.data)
}

export default trackService

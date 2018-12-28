import trae from 'trae'
import configService from './config'

const finstoMusicService = trae.create({
  baseUrl: configService.apiUrl
})

export default finstoMusicService

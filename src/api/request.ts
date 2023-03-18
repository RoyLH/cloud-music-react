import { axiosInstance } from './config'

export const getBannerRequest = () => {
  return axiosInstance.get('/banner')
}

export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized')
}

export const getHotSingerListRequest = (count: number) => {
  return axiosInstance.get(`/top/artists?offset=${count}`)
}

export const getSingerListRequest = (
  category: string,
  alpha: string,
  count: number
) => {
  return axiosInstance.get(
    `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`
  )
}

export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`)
}

export const getAlbumDetailRequest = (id: string) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`)
}

export const getSingerInfoRequest = (id: string) => {
  return axiosInstance.get(`/artists?id=${id}`)
}

export const getHotKeyWordsRequest = () => {
  return axiosInstance.get(`/search/hot`)
}

export const getSuggestListRequest = (query: string) => {
  return axiosInstance.get(`/search/suggest?keywords=${query}`)
}

export const getResultSongsListRequest = (query: string) => {
  return axiosInstance.get(`/search?keywords=${query}`)
}

export const getSongDetailRequest = (id: string) => {
  return axiosInstance.get(`/song/detail?ids=${id}`)
}

export const getLyricRequest = (id: string) => {
  return axiosInstance.get(`/lyric?id=${id}`)
}

export const loginByPhoneRequest = (phone: string, password: string) => {
  return axiosInstance.get(
    `/login/cellphone?phone=${phone}&password=${password}`
  )
}

export const sentVcodeRequest = (phone: string) => {
  return axiosInstance.get(`/captcha/sent?phone=${phone}`)
}

export const loginByVcodeRequest = (phone: string, vcode: string) => {
  return axiosInstance.get(`/captcha/verify?phone=${phone}&captcha=${vcode}`)
}

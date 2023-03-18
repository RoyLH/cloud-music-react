import axios, { AxiosInstance } from 'axios'

const baseURL = 'http://47.105.150.105:4001'

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
})

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, '网络错误!')
  }
)
const obj = {} as any

const getRankNames = async () => {
  for (let i = 0; i < 24; i++) {
    await axiosInstance.get(`/top/list?idx=${i}`).then((data: any) => {
      obj[i] = data.playlist.name
    })
  }
  console.log(obj)
}

getRankNames()

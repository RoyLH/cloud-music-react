import { RankTypes } from './config'

// 防抖函数
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: any
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
      clearTimeout(timer)
    }, delay)
  }
}

// 处理歌手列表拼接歌手名字
export const getName = (list: any[]) => {
  let str = ''
  list.map((item, index) => {
    str += index === 0 ? item.name : '/' + item.name
    return item
  })
  return str
}

// 处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = (rankList: any[]) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1
    }
  }
}

// 找出排行榜的编号
export const filterIdx = (name: string) => {
  for (const [key, value] of Object.entries(RankTypes)) {
    if (value === name) return key
  }
  return null
}

// 给css3相关属性增加浏览器前缀，处理浏览器兼容性问题
const elementStyle = document.createElement('div').style as any

const vendor = (() => {
  // 首先通过transition属性判断是何种浏览器
  const transformNames: { [key: string]: string } = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransfrom',
    ms: 'msTransform',
    standard: 'Transform',
  }
  // for (const key in transformNames) {
  //   if (elementStyle[transformNames[key]] !== undefined) {
  //     return key
  //   }
  // }

  for (const [key, value] of Object.entries(transformNames)) {
    if (elementStyle[value] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle(style: string): string {
  if (vendor === false) {
    return ''
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

// 判断一个对象是否为空对象
export const isEmptyObject = (obj: any) => !obj || Object.keys(obj).length === 0

// 转换歌曲播放时间
export const formatPlayTime = (interval: number) => {
  interval = interval | 0
  const minute = (interval / 60) | 0
  const second = (interval % 60).toString().padStart(2, '0')
  return `${minute}:${second}`
}

export const getTransitionEndName = (dom: HTMLElement) => {
  const cssTransition = ['transition', 'webkitTransition'] as any[]
  const transitionEnd = {
    transition: 'transitionend',
    webkitTransition: 'webkitTransitionEnd',
  } as any
  // for (let i = 0; i < cssTransition.length; i++) {
  //   if (dom.style[cssTransition[i]] !== undefined) {
  //     return transitionEnd[cssTransition[i]]
  //   }
  // }

  for (let i = 0; i < cssTransition.length; i++) {
    if (dom.style[cssTransition[i]] !== undefined) {
      return transitionEnd[cssTransition[i]]
    }
  }
  return undefined
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 随机算法
export function shuffle(arr: any[]) {
  const new_arr: any[] = []
  arr.forEach(item => {
    new_arr.push(item)
  })
  for (let i = 0; i < new_arr.length; i++) {
    const j = getRandomInt(0, i)
    const t = new_arr[i]
    new_arr[i] = new_arr[j]
    new_arr[j] = t
  }
  return new_arr
}

// 找到当前的歌曲索引
export const findIndex = (song: any, list: any[]) => {
  return list.findIndex(item => {
    return song.id === item.id
  })
}

// 拼接出歌曲的url链接
export const getSongUrl = (id: string) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

// 除去手机号码的空格符号
export const trimPhone = (val: string) => val.replace(/(^\s+)|(\s+$)|\s+/g, '')

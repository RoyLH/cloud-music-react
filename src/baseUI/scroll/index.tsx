import { debounce } from '@/api/utils'
import Loading2 from '@/baseUI/loading-v2/index'
import Loading from '@/baseUI/loading/index'
import BScroll from 'better-scroll'
import PropTypes from 'prop-types'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { PullDownLoading, PullUpLoading, ScrollContainer } from './style'

// 下为问题代码，以此为鉴
// useEffect(() => {
//   if(bScroll) return;
//   const scroll = new BScroll(scrollContaninerRef.current, {
//     scrollX: direction === "horizontal",
//     scrollY: direction === "vertical",
//     probeType: 3,
//     click: click,
//     bounce:{
//       top: bounceTop,
//       bottom: bounceBottom
//     }
//   });
//   setBScroll(scroll);
//   if(pullUp) {
//     scroll.on('scrollEnd', () => {
//       //判断是否滑动到了底部
//       if(scroll.y <= scroll.maxScrollY + 100){
//         pullUp();
//       }
//     });
//   }
//   if(pullDown) {
//     scroll.on('touchEnd', (pos) => {
//       //判断用户的下拉动作
//       if(pos.y > 50) {
//         debounce(pullDown, 0)();
//       }
//     });
//   }

//   if(onScroll) {
//     scroll.on('scroll', (scroll) => {
//       onScroll(scroll);
//     })
//   }

//   if(refresh) {
//     scroll.refresh();
//   }
//   return () => {
//     scroll.off('scroll');
//     setBScroll(null);
//   }
//   // eslint-disable-next-line
// }, []);

const Scroll = forwardRef((props: any, ref) => {
  const [bScroll, setBScroll] = useState<BScroll | null>(null)

  const scrollContaninerRef = useRef<HTMLDivElement | null>(null)

  const {
    direction,
    click,
    refresh,
    pullUpLoading,
    pullDownLoading,
    bounceTop,
    bounceBottom,
  } = props

  const { pullUp, pullDown, onScroll } = props

  const pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 500)
  }, [pullUp])

  const pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 500)
  }, [pullDown])

  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current!, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    })
    setBScroll(scroll)
    return () => {
      setBScroll(null)
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', onScroll)
    return () => {
      bScroll.off('scroll', onScroll)
    }
  }, [onScroll, bScroll])

  useEffect(() => {
    if (!bScroll || !pullUp) return
    const handlePullUp = () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce()
      }
    }
    bScroll.on('scrollEnd', handlePullUp)
    return () => {
      bScroll.off('scrollEnd', handlePullUp)
    }
  }, [pullUp, pullUpDebounce, bScroll])

  useEffect(() => {
    if (!bScroll || !pullDown) return
    const handlePullDown = (pos: any) => {
      //判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce()
      }
    }
    bScroll.on('touchEnd', handlePullDown)
    return () => {
      bScroll.off('touchEnd', handlePullDown)
    }
  }, [pullDown, pullDownDebounce, bScroll])

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  const PullUpdisplayStyle = pullUpLoading
    ? { display: '' }
    : { display: 'none' }

  const PullDowndisplayStyle = pullDownLoading
    ? { display: '' }
    : { display: 'none' }

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll
      }
    },
  }))

  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={PullUpdisplayStyle}>
        <Loading></Loading>
      </PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={PullDowndisplayStyle}>
        <Loading2></Loading2>
      </PullDownLoading>
    </ScrollContainer>
  )
})

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
}

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool, //是否支持向上吸顶
  bounceBottom: PropTypes.bool, //是否支持向下吸顶
}

export default Scroll

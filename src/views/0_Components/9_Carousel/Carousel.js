import React from 'react'

// https://github.com/amio/re-carousel
const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  frame: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    userSelect: 'none',
    willChange: 'transform'
  }
}

class Carousel extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      frames: [].concat(props.frames || props.children || []),
      current: 0
    }

    this.mounted = false
    this.debounceTimeoutId = null
    this.drag = false
  }

  componentDidMount () {
    this.mounted = true
    this.hideFrames()
    this.updateFrameSize(() => {
      this.prepareSiblingFrames()
    })

    this.refs.wrapper.addEventListener('mousedown', () => this.drag = false, {capture: true})
    this.refs.wrapper.addEventListener('mousemove', () => this.drag = true, {capture: true})
    this.refs.wrapper.addEventListener('click', this.stopLink, {capture: true})

    this.refs.wrapper.addEventListener('touchmove', this.onTouchMove, {capture: true, passive: true})
    this.refs.wrapper.addEventListener('touchend', this.onTouchEnd, {capture: true})
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount () {
    this.mounted = false

    this.refs.wrapper.removeEventListener('mousedown', () => this.drag = false, {capture: true})
    this.refs.wrapper.removeEventListener('mousemove', () => this.drag = true, {capture: true})
    this.refs.wrapper.removeEventListener('click', this.stopLink, {capture: true})

    this.refs.wrapper.removeEventListener('touchmove', this.onTouchMove, {capture: true, passive: true})
    this.refs.wrapper.removeEventListener('touchend', this.onTouchEnd, {capture: true})
    window.removeEventListener('resize', this.onResize)
  }

  componentDidUpdate(_, prevState) {
    if (this.state.frames.length && this.state.frames.length !== prevState.frames.length) {
      // reset to default state
      this.hideFrames()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const frames = [].concat(nextProps.frames || nextProps.children || [])
    const nextState = { frames }
    if (frames.length && frames.length !== prevState.frames.length) {
      nextState.current = 0
    }
    return nextState
  }

  stopLink = (e) => {
    if(this.drag) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  hideFrames () {
    for (let i = 1; i < this.state.frames.length; i++) {
      this.refs['f' + i].style.opacity = 0
    }
  }

  onResize = () => {
    clearTimeout(this.debounceTimeoutId)
    this.debounceTimeoutId = setTimeout(() => {
      this.updateFrameSize(() => {
        this.prepareSiblingFrames()
      })
    }, 25)
  }

  onTouchStart = (e) => {
    if (this.state.total < 2) return

    this.updateFrameSize()
    this.prepareSiblingFrames()

    const { pageX, pageY } = (e.touches && e.touches[0]) || e
    this.setState({
      startX: pageX,
      startY: pageY,
      deltaX: 0,
      deltaY: 0
    })

    this.refs.wrapper.addEventListener('mousemove', this.onTouchMove, {capture: true})
    this.refs.wrapper.addEventListener('mouseup', this.onTouchEnd, {capture: true})
    this.refs.wrapper.addEventListener('mouseleave', this.onTouchEnd, {capture: true})
  }

  onTouchMove = (e) => {
    if (e.touches && e.touches.length > 1) return

    const { pageX, pageY } = (e.touches && e.touches[0]) || e
    let deltaX = pageX - this.state.startX
    let deltaY = pageY - this.state.startY
    this.setState({
      deltaX: deltaX,
      deltaY: deltaY
    })

    if (this.props.axis === 'x' && Math.abs(deltaX) > Math.abs(deltaY)) {
      // e.preventDefault()
      e.stopPropagation()
    }
    if (this.props.axis === 'y' && Math.abs(deltaY) > Math.abs(deltaX)) {
      e.preventDefault()
      e.stopPropagation()
    }

    // when reach frames edge in non-loop mode, reduce drag effect.
    if (!this.props.loop) {
      if (this.state.current === this.state.frames.length - 1) {
        deltaX < 0 && (deltaX /= 3)
        deltaY < 0 && (deltaY /= 3)
      }
      if (this.state.current === 0) {
        deltaX > 0 && (deltaX /= 3)
        deltaY > 0 && (deltaY /= 3)
      }
    }

    // this.moveFramesBy(deltaX, deltaY)
  }

  onTouchEnd = () => {
    const direction = this.decideEndPosition()
    direction && this.transitFramesTowards(direction)

    // cleanup
    this.refs.wrapper.removeEventListener('mousemove', this.onTouchMove, {capture: true})
    this.refs.wrapper.removeEventListener('mouseup', this.onTouchEnd, {capture: true})
    this.refs.wrapper.removeEventListener('mouseleave', this.onTouchEnd, {capture: true})
  }

  decideEndPosition () {
    const { deltaX = 0, deltaY = 0, current, frames } = this.state
    const { axis, loop, minMove } = this.props

    switch (axis) {
      case 'x':
        if (loop === false) {
          if (current === 0 && deltaX > 0) return 'origin'
          if (current === frames.length - 1 && deltaX < 0) return 'origin'
        }
        if (Math.abs(deltaX) < minMove) return 'origin'
        return deltaX > 0 ? 'right' : 'left'
      case 'y':
        if (loop === false) {
          if (current === 0 && deltaY > 0) return 'origin'
          if (current === frames.length - 1 && deltaY < 0) return 'origin'
        }
        if (Math.abs(deltaY) < minMove) return 'origin'
        return deltaY > 0 ? 'down' : 'up'
      default:
    }
  }

  // moveFramesBy (deltaX, deltaY) {
  //   const { prev, current, next } = this.state.movingFrames
  //   const { frameWidth, frameHeight } = this.state

  //   switch (this.props.axis) {
  //     case 'x':
  //       translateXY(current, deltaX, 0)
  //       if (deltaX < 0) {
  //         translateXY(next, deltaX + frameWidth, 0)
  //       } else {
  //         translateXY(prev, deltaX - frameWidth, 0)
  //       }
  //       break
  //     case 'y':
  //       translateXY(current, 0, deltaY)
  //       if (deltaY < 0) {
  //         translateXY(next, 0, deltaY + frameHeight)
  //       } else {
  //         translateXY(prev, 0, deltaY - frameHeight)
  //       }
  //       break
  //     default:
  //   }
  // }

  updateFrameSize (cb) {
    const { width, height } = window.getComputedStyle(this.refs.wrapper)
    this.setState({
      frameWidth: parseFloat(width.split('px')[0]),
      frameHeight: parseFloat(height.split('px')[0])
    }, cb)
  }

  getSiblingFrames () {
    return {
      current: this.refs['f' + this.getFrameId()],
      prev: this.refs['f' + this.getFrameId('prev')],
      next: this.refs['f' + this.getFrameId('next')]
    }
  }

  prepareSiblingFrames () {
    const siblings = this.getSiblingFrames()

    if (!this.props.loop) {
      this.state.current === 0 && (siblings.prev = undefined)
      this.state.current === this.state.frames.length - 1 && (siblings.next = undefined)
    }

    this.setState({ movingFrames: siblings })

    // prepare frames position
    translateXY(siblings.current, 0, 0)
    if (this.props.axis === 'x') {
      translateXY(siblings.prev, -this.state.frameWidth, 0)
      translateXY(siblings.next, this.state.frameWidth, 0)
    } else {
      translateXY(siblings.prev, 0, -this.state.frameHeight)
      translateXY(siblings.next, 0, this.state.frameHeight)
    }

    return siblings
  }

  getFrameId (pos) {
    const { frames, current } = this.state
    const total = frames.length
    switch (pos) {
      case 'prev':
        return (current - 1 + total) % total
      case 'next':
        return (current + 1) % total
      default:
        return current
    }
  }

  transitFramesTowards (direction) {
    const { prev, current, next } = this.state.movingFrames
    const { duration, axis, onTransitionEnd } = this.props

    let newCurrentId = this.state.current
    switch (direction) {
      case 'up':
        translateXY(current, 0, -this.state.frameHeight, duration)
        translateXY(next, 0, 0, duration)
        newCurrentId = this.getFrameId('next')
        break
      case 'down':
        translateXY(current, 0, this.state.frameHeight, duration)
        translateXY(prev, 0, 0, duration)
        newCurrentId = this.getFrameId('prev')
        break
      case 'left':
        translateXY(current, -this.state.frameWidth, 0, duration)
        translateXY(next, 0, 0, duration)
        newCurrentId = this.getFrameId('next')
        break
      case 'right':
        translateXY(current, this.state.frameWidth, 0, duration)
        translateXY(prev, 0, 0, duration)
        newCurrentId = this.getFrameId('prev')
        break
      default: // back to origin
        translateXY(current, 0, 0, duration)
        if (axis === 'x') {
          translateXY(prev, -this.state.frameWidth, 0, duration)
          translateXY(next, this.state.frameWidth, 0, duration)
        } else if (axis === 'y') {
          translateXY(prev, 0, -this.state.frameHeight, duration)
          translateXY(next, 0, this.state.frameHeight, duration)
        }
    }

    onTransitionEnd && setTimeout(() => onTransitionEnd(this.getSiblingFrames()), duration)

    this.setState({ current: newCurrentId })
  }

  render () {
    const { frames, current } = this.state
    const { widgets, axis, loop, interval } = this.props
    const wrapperStyle = objectAssign(styles.wrapper, this.props.style)

    return (
      <div style={wrapperStyle}>
        <div
          ref='wrapper'
          style={objectAssign({overflow: 'hidden'}, wrapperStyle)}
          onTouchStart={this.onTouchStart}
          className={this.props.className}
          onMouseDown={this.onTouchStart} >
          {
            frames.map((frame, i) => {
              const frameStyle = objectAssign({zIndex: 19 - i}, styles.frame)
              return <div ref={'f' + i} key={i} style={frameStyle}>{frame}</div>
            })
          }
          { this.props.frames && this.props.children }
        </div>
        {
          widgets && [].concat(widgets).map((Widget, i) => (
            <Widget
              key={i}
              index={current}
              total={frames.length}
              axis={axis} loop={loop}
              interval={interval} />
          ))
        }
      </div>
    )
  }
}

Carousel.defaultProps = {
  axis: 'x',
  loop: false,
  interval: 5000,
  duration: 300,
  minMove: 40
}

function translateXY (el, x, y, duration = 0) {
  if (!el) return

  el.style.opacity = '1'

  // animation
  el.style.transitionDuration = duration + 'ms'
  el.style.webkitTransitionDuration = duration + 'ms'

  el.style.transform = `translate(${x}px, ${y}px)`
  el.style.webkitTransform = `translate(${x}px, ${y}px) translateZ(0)`
}

function objectAssign (target) {
  var output = Object(target)
  for (var index = 1; index < arguments.length; index++) {
    var source = arguments[index]
    if (source !== undefined && source !== null) {
      for (var nextKey in source) {
        if (source.hasOwnProperty(nextKey)) {
          output[nextKey] = source[nextKey]
        }
      }
    }
  }
  return output
}

export default Carousel
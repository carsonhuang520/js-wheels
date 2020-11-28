class Slide {
  constructor(options) {
    this.options = options
    this.$element = $(options.element)
    this.$element.addClass('slide-wrapper')
    this.timer = null
    this.initHtml()
    this.bindEvents()
    this.go(0)
    if (this.options.autoPlay) {
      this.play()
    }
  }
  initHtml() {
    this.width = this.$element.children('ol').children('li').width()
    this.$element.width(this.width)
    this.$prev = $('<button class="slide-prev">上一张</button>')
    this.$next = $('<button class="slide-next">下一张</button>')
    this.$element.append(this.$prev)
    this.$element.append(this.$next)
  }
  bindEvents() {
    this.$prev.on('click', () => {
      this.prev()
    })
    this.$next.on('click', () => {
      this.next()
    })
    this.$element
      .on('mouseenter', () => {
        this.stop()
      })
      .on('mouseleave', () => {
        this.play()
      })
  }
  go(index) {
    let $ol = this.$element.children('ol')
    const lis = this.$element.children('ol').children('li')
    if (index >= lis.length) {
      index = 0
    } else if (index < 0) {
      index = lis.length - 1
    }
    $ol.css({
      transform: `translateX(${-index * this.width + 'px'})`,
    })
    this.current = index
  }
  next() {
    this.go(this.current + 1)
  }
  prev() {
    this.go(this.current - 1)
  }
  play() {
    this.timer = setInterval(() => {
      this.go(this.current + 1)
    }, 2000)
  }
  stop() {
    window.clearInterval(this.timer)
  }
}

const slide = new Slide({
  element: '.slides',
  autoPlay: true,
})

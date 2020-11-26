class Sticky {
  constructor(selector, n) {
    this.elements = $(selector)
    this.offset = n || 0
    this.offsets = []
    this.addWrapper()
    this.offsetCache()
    this.listenToScroll()
  }
  addWrapper() {
    this.elements.each((index, el) => {
      $(el).wrap('<div class="stickyWrapper"></div>')
      $(el).parent().height($(el).height())
    })
  }
  offsetCache() {
    this.elements.each((index, el) => {
      this.offsets[index] = $(el).offset()
    })
  }
  listenToScroll() {
    $(window).on('scroll', () => {
      var scrollY = window.scrollY
      this.elements.each((index, el) => {
        var $el = $(el)
        if (scrollY + this.offset > this.offsets[index].top) {
          $el.addClass('sticky').css({ top: this.offset })
        } else {
          $el.removeClass('sticky')
        }
      })
    })
  }
}

new Sticky('#topbar')
new Sticky('button', 60)

class Tabs {
  constructor(selector) {
    this.element = $(selector)
    this.init()
    this.bindEvent()
  }
  init() {
    this.element.each(function (index, ele) {
      $(ele).children('.tabs-bar').children('li').eq(0).addClass('active')
      $(ele).children('.tabs-content').children('li').eq(0).addClass('active')
    })
  }
  bindEvent() {
    this.element.on('click', '.tabs-bar > li', function (e) {
      const $li = $(e.currentTarget)
      $li.addClass('active').siblings().removeClass('active')
      const index = $li.index()
      $li
        .closest('.tabs')
        .find('.tabs-content > li')
        .eq(index)
        .addClass('active')
        .siblings()
        .removeClass('active')
    })
  }
}

var tab = new Tabs('.tabs')

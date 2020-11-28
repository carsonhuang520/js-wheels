class Suggestion {
  constructor(options) {
    this.options = options
    this.$input = $(options.input)
    this.$input.wrap('<div class="suggestion-wrapper"></div>')
    this.$wrapper = this.$input.parent()
    this.$ol = $('<div class="suggestion-list"></div>')
    this.$input.after(this.$ol)
    this.$loading = $('<div class="suggestion-loading"></div>')
    this.$loading.html(options.loadingTemplate)
    this.$empty = $('<div class="suggestion-empty"></div>')
    this.$empty.html(options.emptyTemplate)
    this.$ol.after(this.$loading)
    this.$ol.after(this.$empty)
    this.bindEvent()
  }
  bindEvent() {
    let timerId
    this.$input.on('input', (e) => {
      if (timerId) {
        window.clearTimeout(timerId)
      }
      timerId = setTimeout(() => {
        this.search(e.currentTarget.value)
        timerId = undefined
      }, 1000)
    })
    this.$ol.on('click', 'li', (e) => {
      this.$input.val($(e.currentTarget).text())
    })
  }
  search(word) {
    this.$wrapper.addClass('loading')
    this.$wrapper.removeClass('empty')
    this.options.search(word, (array) => {
      this.$ol.empty()
      this.$wrapper.removeClass('loading')
      if (!array || array.length === 0) {
        this.$wrapper.addClass('empty')
        return
      }
      array.forEach((item) => {
        this.$ol.append($('<li></li>').text(item))
      })
    })
  }
}

let s = new Suggestion({
  input: 'input',
  search: function (text, callback) {
    if (text === '') {
      return setTimeout(() => callback([]), 500)
    }
    let array = []
    for (let i = 0; i < 5; i++) {
      let n = parseInt(Math.random() * 100, 10)
      array.push(n)
    }
    setTimeout(() => callback(array), 500)
  },
  loadingTemplate: '加载中...',
  emptyTemplate: '找不到',
})

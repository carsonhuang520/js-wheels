class Dialog {
  constructor(options) {
    this.options = options
    this.init()
  }
  get template() {
    let { title, content } = this.options
    return `
    <div class="dialog-wrapper">
      <div class="dialog">
        <header class="dialog-header">${title}</header>
        <main class="dialog-main">${content}</main>
        <footer class="dialog-footer"></footer>
      </div>
    </div>
  `
  }
  generateButtons() {
    let { buttons } = this.options
    let $btns = buttons.map((item) => {
      let $b = $('<button></button>')
      $b.text(item.text)
      $b.on('click', item.action)
      return $b
    })
    return $btns
  }
  init() {
    let $dialog = $(this.template)
    $dialog.find('footer').append(this.generateButtons())
    this.$dialog = $dialog
  }
  open() {
    this.$dialog.appendTo('body')
  }
  close() {
    this.$dialog.detach()
  }
}
btn.onclick = function () {
  var dialog = new Dialog({
    title: '标题',
    content: '<b>欢迎</b>',
    buttons: [
      {
        text: '确定',
        action: function () {
          setTimeout(() => {
            dialog.close()
          }, 3000)
        },
      },
      {
        text: '取消',
        action: function () {
          dialog.close()
        },
      },
    ],
  })
  dialog.open()
}

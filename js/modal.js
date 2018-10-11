import {$} from './helpers'

const close = (e) => {
  let modals = $('.js-modal')
  modals.forEach(modal => modal.classList.remove('is-active'))
}

const init = () => {
  let closes = $('.js-close-modal')
  console.log(closes)
  closes.forEach(node => node.addEventListener('click', close))
}

export default init
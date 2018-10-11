import {$} from './helpers'

const close = (e) => {
  $('.js-modal').forEach(node => node.classList.remove('is-active'))
}

const init = () => {
  $('.js-close-modal').forEach(node => node.addEventListener('click', close))
}

export default init
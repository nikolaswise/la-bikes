import {$} from './helpers'

// Close modals by removing active classes
const close = (e) => {
  $('.js-modal').forEach(node => node.classList.remove('is-active'))
}

// When close modal nodes get clicked, close modals
const init = () => {
  $('.js-close-modal').forEach(node => node.addEventListener('click', close))
}

export default init
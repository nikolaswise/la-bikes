import firebase from 'firebase'
import uuid from 'uuid/v1'
import 'firebase/database'
import {$} from '../helpers'
import bus from '../bus'

const formHandler = (session) => (e) => {
  e.preventDefault()

  // Get the form values
  let values = Array(...e.target)

  // Assemvle the object
  let update = {
    voteFor: values[1].checked,
    comments: values[2].value
  }

  // Update this stations data for the current station.
  session.child(`station_number_${values[0].value}`).update(update)

  // Quick and dirty active class swap
  $('.js-feedback-form').forEach(node => node.classList.remove('is-active'))
  $('.js-form-confirm').forEach(node => node.classList.add('is-active'))
}

const setFormListeners = (session) => () => {
  // On submit of form, handle the event
  $('.js-feedback-form').forEach(node => node.addEventListener('submit', formHandler(session)))
}


export const init = (config) => {
  // Set up firebase and create a new record for our current session
  const app = firebase.initializeApp(config);
  const db = app.database()
  const ref = db.ref()
  const id = uuid()
  const session = ref.child(id)
  session.set({
    sessionStart: Date.now()
  })
  // When we hear a form event, bind listenres for the dom.
  bus.on('form:bind', setFormListeners(session))
}
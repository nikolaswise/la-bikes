import * as map from './map/index.js'
import * as store from './firebase/index.js'
import modal from './modal.js'
import bus from './bus'

mapboxgl.accessToken = 'pk.eyJ1Ijoibmlrb2xhc3dpc2UiLCJhIjoieVJJcE1QUSJ9.f8co32wYW_YTeh_KM6PGLA'

var firebaseConfig = {
  apiKey: "AIzaSyD_42FJwy7FM_xUhE7KOyGw0V1RJi6lgLU",
  authDomain: "la-bikes.firebaseapp.com",
  databaseURL: "https://la-bikes.firebaseio.com",
  projectId: "la-bikes",
  storageBucket: "",
  messagingSenderId: "342618483604"
}

bus.register({
  channel: 'form:bind',
  emits: 'n/a',
  description: 'Emits an event when a new form is added to the dom.',
  listeners: []
})

bus.register({
  channel: 'popups:close',
  emits: 'n/a',
  description: 'Close popups plz',
  listeners: []
})

map.draw()
store.init(firebaseConfig)
modal()

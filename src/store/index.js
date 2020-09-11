import { Subject } from 'rxjs';

import EventEmitter from 'wolfy87-eventemitter'
const temperature = new EventEmitter();
const airPressure = new EventEmitter();
const humidity = new EventEmitter();

const subject = new Subject();

const initialState = {
  system: {
    temperature: 0,
    airPressure: 0,
    humidity: 0
  }
};

let state = initialState;

const dashboardStore = {
  init: () => {
    state = {...state}
    subject.next(state)
    temperature.on('data', (value)=>{
      state = {...state, system: {...state.system, temperature: value }}
    })
    airPressure.on('data', (value)=>{
      state = {...state, system: {...state.system, airPressure:value }}
    })
    humidity.on('data', (value)=>{
      state = {...state, system: {...state.system, humidity:value } }
    })

    // Here Checking not available
    const timeout = setTimeout(()=>{
      if(!state.system.temperature){
        state = {...state, system: {...state.system, temperature: 'N/A' }}
      }
      if(!state.system.airPressure){
        state = {...state, system: {...state.system, airPressure: 'N/A' }}
      }
      if(!state.system.humidity){
        state = {...state, system: {...state.system, humidity: 'N/A' }}
      }
    }, 1000)
    

  },
  subscribe: setState => subject.subscribe(setState),
  
  send: () => {
    let temp = (Math.random() * 10).toFixed(2)
    let pressure = state.system.airPressure
    let hum = (Math.random() * 10).toFixed(2)
    
    // Checking for new values
    if(temp !== state.system.temperature || pressure !== state.system.airPressure || hum !== state.system.humidity ){
      temperature.emit('data', temp)
      airPressure.emit('data', pressure) 
      humidity.emit('data', hum)
    }
    subject.next(state);
  },
  initialState
};

export default dashboardStore;
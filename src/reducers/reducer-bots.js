const sample = require('../../bot-data.json')

export const prefix = 'rpa-benchmarking/bots/'

export const REQUEST_BOTS = `${prefix}REQUEST_BOTS`
export const RECEIVED_BOTS = `${prefix}RECEIVED_BOTS`

export const REQUEST_BOT_RUNNERS = `${prefix}REQUEST_BOT_RUNNERS`
export const RECEIVED_BOT_RUNNERS = `${prefix}RECEIVED_BOT_RUNNERS`

export const REQUEST_BOT_CREATORS = `${prefix}REQUEST_BOT_CREATORS`
export const RECEIVED_BOT_CREATORS = `${prefix}RECEIVED_BOT_CREATORS`

export const SET_ENVIRONMENT_FILTER = `${prefix}SET_ENVIRONMENT_FILTER`
export const SET_BENCHMARK_FILTER = `${prefix}SET_BENCHMARK_FILTER`

export const SET_BOT_DATA_TYPE = `${prefix}SET_BOT_DATA_TYPE`

const botData = [
  { name: 'Page A', uv: 590, pv: 800, amt: 1400 },
  { name: 'Page B', uv: 868, pv: 967, amt: 1506 },
  { name: 'Page C', uv: 1397, pv: 1098, amt: 989 },
  { name: 'Page D', uv: 1480, pv: 1200, amt: 1228 },
  { name: 'Page E', uv: 1520, pv: 1108, amt: 1100 },
  { name: 'Page F', uv: 1400, pv: 680, amt: 1700 }
]

const runnersData = [
  { name: 'Page A', uv: 4000, female: 2400, male: 2400 },
  { name: 'Page B', uv: 3000, female: 1398, male: 2210 },
  { name: 'Page C', uv: 2000, female: 9800, male: 2290 },
  { name: 'Page D', uv: 2780, female: 3908, male: 2000 },
  { name: 'Page E', uv: 1890, female: 4800, male: 2181 },
  { name: 'Page F', uv: 2390, female: 3800, male: 2500 },
  { name: 'Page G', uv: 3490, female: 4300, male: 2100 }
]

const creatorsData = [
  { value: 14, time: 1503617297689 },
  { value: 15, time: 1503616962277 },
  { value: 15, time: 1503616882654 },
  { value: 20, time: 1503613184594 },
  { value: 15, time: 1503611308914 }
]

const INITIAL_STATE = {
  filters: {
    rpa: 'dev',
    benchmark: 'rpa'
  },
  toggles: [
    {
      label: 'Bots',
      name: 'bots',
      value: 100
    },
    {
      label: 'Bot Runners',
      name: 'bot_runners',
      value: 250
    },
    {
      label: 'Bot Creators',
      name: 'bot_creators',
      value: 40
    }
  ],
  requesting: false,
  bots: botData,
  sample: sample.data,
  runners: runnersData,
  creators: creatorsData,
  botType: 'bots'
}

const main = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_BOTS:
    case REQUEST_BOT_RUNNERS:
    case REQUEST_BOT_CREATORS:
      return {
        ...state,
        requesting: true
      }

    case RECEIVED_BOTS:
      return {
        ...state,
        requesting: false,
        bots: action.payload
      }

    case RECEIVED_BOT_RUNNERS:
      return {
        ...state,
        requesting: false
      }

    case RECEIVED_BOT_CREATORS:
      return {
        ...state,
        requesting: false
      }

    case SET_ENVIRONMENT_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          rpa: action.payload
        }
      }

    case SET_BENCHMARK_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          benchmark: action.payload
        }
      }

    case SET_BOT_DATA_TYPE:
      return {
        ...state,
        botType: action.payload
      }

    default:
      return state
  }
}

export const setEnvironment = val => ({
  type: SET_ENVIRONMENT_FILTER,
  payload: val
})

export const setBenchmark = val => ({
  type: SET_BENCHMARK_FILTER,
  payload: val
})

export const toggleBotDataType = val => ({
  type: SET_BOT_DATA_TYPE,
  payload: val
})

export const requestBots = () => ({
  type: REQUEST_BOTS
})

export const receivedBots = (data = botData) => ({
  type: RECEIVED_BOTS,
  payload: data
})

export const requestBotRunners = () => ({
  type: REQUEST_BOT_RUNNERS
})

export const requestBotCreators = () => ({
  type: REQUEST_BOT_CREATORS
})

export default main

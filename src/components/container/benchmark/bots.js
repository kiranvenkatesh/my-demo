import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Scatter,
  ScatterChart
} from 'recharts'
import {
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Button
} from '@material-ui/core'
import CheckCircle from '@material-ui/icons/CheckCircle'
import { withStyles } from '@material-ui/core/styles'
import { withSnackbar } from 'notistack'

import ServiceLoader from '../../presentational/service-loader'
import * as Actions from '../../../reducers/reducer-bots'
import { mockService } from '../../../services/bots'
import styles from '../../../styles'

const BotPerformance = React.memo(({ name, value, label, toggle, type }) => (
  <Button
    style={{
      minWidth: 150,
      margin: 10
    }}
    variant="contained"
    color="primary"
    onClick={() => toggle && toggle(name)}>
    {type === name && <CheckCircle color="secondary" />}
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
      }}>
      <Typography variant="h5" style={{ color: '#FFFFFF' }}>
        {value}
      </Typography>
      <Typography variant="subtitle1" style={{ color: '#FFFFFF' }}>
        {label}
      </Typography>
    </div>
  </Button>
))

class Bots extends PureComponent {
  state = {
    rpa: 'dev',
    benchmark: 'rpa',
    loading: false
  }

  handleEnvironmentChange = event => {
    const {
      enqueueSnackbar,
      setEnvironment,
      requestBots,
      receivedBots
    } = this.props
    const value = event.target.value

    setEnvironment(value)

    requestBots()

    mockService().then(() => {
      receivedBots()
      enqueueSnackbar('Data Updated', { variant: 'success' })
    })
  }

  handleBenchmarkChange = event => {
    const {
      enqueueSnackbar,
      setBenchmark,
      requestBots,
      receivedBots
    } = this.props
    const value = event.target.value
    setBenchmark(value)

    requestBots()

    mockService().then(() => {
      receivedBots()
      enqueueSnackbar('Data Updated', { variant: 'success' })
    })
  }

  handleChart = val => {
    const { toggle, requestBots, receivedBots, enqueueSnackbar } = this.props
    requestBots()
    mockService().then(() => {
      receivedBots()
      toggle(val)
      enqueueSnackbar('Updated Chart Data', { variant: 'success' })
    })
  }

  render() {
    const { classes, bots, toggle } = this.props
    const {
      filters,
      requesting,
      bots: botData,
      toggles,
      botType,
      runners,
      creators,
      sample
    } = bots
    const { rpa, benchmark } = filters

    return (
      <Fragment>
        {requesting && <ServiceLoader />}
        <div style={{ display: 'flex' }}>
          {toggles.map(item => (
            <BotPerformance
              key={item.name}
              toggle={this.handleChart}
              type={botType}
              {...item}
            />
          ))}
        </div>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" className={classes.formLabel}>
            RPA Environments
          </FormLabel>
          <RadioGroup
            aria-label="Environments"
            name="environments"
            className={classes.group}
            value={rpa}
            onChange={this.handleEnvironmentChange}>
            <FormControlLabel
              value="dev"
              control={<Radio />}
              label="Development"
            />
            <FormControlLabel value="uat" control={<Radio />} label="UAT" />
            <FormControlLabel
              value="prod"
              control={<Radio />}
              label="Production"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" className={classes.formLabel}>
            Benchmark
          </FormLabel>
          <RadioGroup
            aria-label="Benchmark"
            name="benchmark"
            className={classes.group}
            value={benchmark}
            onChange={this.handleBenchmarkChange}>
            <FormControlLabel
              value="peers"
              control={<Radio />}
              label="Industry Peers"
            />
            <FormControlLabel
              value="rpa"
              control={<Radio />}
              label="RPA Benchmarks"
            />
          </RadioGroup>
        </FormControl>

        <div
          style={{
            transition: 'opacity 0.6s ease',
            opacity: requesting ? 0.55 : 1
          }}>
          {botType === 'bots' && (
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart
                data={sample[filters.rpa]}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis
                  dataKey="time"
                  domain={['auto', 'auto']}
                  name="Time"
                  scale="time"
                  tickFormatter={unixTime => moment.unix(unixTime).format('ll')}
                  type="number"
                  padding={{ left: 20, right: 20 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="amt"
                  fill="#8884d8"
                  stroke="#8884d8"
                />
                <Bar dataKey="value" barSize={20} fill="#ff7300" />
                <Line type="monotone" dataKey="pv" stroke="#ff7300" />
                {benchmark === 'peers' && (
                  <Bar dataKey="peers" barSize={20} fill="#413ea0" />
                )}
                {benchmark === 'peers' && (
                  <Line type="monotone" dataKey="peers" stroke="#413ea0" />
                )}

                {benchmark === 'rpa' && (
                  <Bar dataKey="bench" barSize={20} fill="#413ea0" />
                )}
                {benchmark === 'rpa' && (
                  <Line type="monotone" dataKey="bench" stroke="#413ea0" />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          )}

          {botType === 'bot_runners' && (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={runners}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="female" stackId="a" fill="#8884d8" />
                <Bar dataKey="male" stackId="a" fill="#82ca9d" />
                <Bar dataKey="uv" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          )}

          {botType === 'bot_creators' && (
            <ResponsiveContainer width="100%" height={350}>
              <ScatterChart>
                <XAxis
                  dataKey="time"
                  domain={['auto', 'auto']}
                  name="Time"
                  tickFormatter={unixTime => {
                    console.log(unixTime)
                    return moment(unixTime).format('HH:mm Do')
                  }}
                  type="number"
                />
                <YAxis dataKey="value" name="Value" />

                <Scatter
                  data={creators}
                  line={{ stroke: '#666666' }}
                  lineJointType="monotoneX"
                  lineType="joint"
                  name="Values"
                />
              </ScatterChart>
            </ResponsiveContainer>
          )}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ bots }) => ({
  bots
})

const mapDispatchToProps = {
  requestBots: Actions.requestBots,
  receivedBots: Actions.receivedBots,
  setEnvironment: Actions.setEnvironment,
  setBenchmark: Actions.setBenchmark,
  toggle: Actions.toggleBotDataType
}

const ConnectedBots = connect(
  mapStateToProps,
  mapDispatchToProps
)(Bots)
export default withStyles(styles, { withTheme: true })(
  withSnackbar(ConnectedBots)
)

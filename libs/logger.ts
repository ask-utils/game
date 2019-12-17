import bunyan from 'bunyan'
import BunyanFormat from 'bunyan-format'

const logger = bunyan.createLogger({
  name: '@ask-utils/game',
  level: 'debug',
  stream: new BunyanFormat({ outputMode: 'bunyan', levelInString: true })
})
export default logger

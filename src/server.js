require('express-async-errors')
require('./wakey')
const morgan = require('morgan');
const helmet = require('helmet') ;
const app = require('./app')
const { logger, morganConfig } = require('./configs/index.config')

const errorMiddleware = require('./errors')

app.use(morgan(morganConfig));
app.use(helmet())
app.get('/health', (req, res) => res.sendStatus(200))
app.use(errorMiddleware)

const port = process.env.PORT || 3000
app.listen(port, () => {
    logger.info(`server running on port ${port}`)
})
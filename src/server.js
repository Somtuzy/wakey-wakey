require('express-async-errors')
require('./wakey')
const app = require('./app')
const { logger } = require('./configs/index.config')

const errorMiddleware = require('./errors')

app.get('/health', (req, res) => res.sendStatus(200))
app.use(errorMiddleware)

const port = process.env.PORT || 3000
app.listen(port, () => {
    logger.info(`server running on port ${port}`)
})
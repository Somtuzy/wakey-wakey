const app = require('./app')
const { logger } = require('./configs/index.config')
require('./wake')

const port = process.env.PORT || 3000
app.listen(port, () => {
    logger.info(`server running on port ${port}`)
})
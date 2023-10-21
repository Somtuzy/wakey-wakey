const axios = require('axios')
const { logger, sendMail } = require('./configs/index.config')

const serversToWake = process.env.SERVERS.split(',')
const deployHooks = process.env.DEPLOYHOOKS.split(',')

if (serversToWake.length !== deployHooks.length) {
    return logger.info(`You haven't provided a deploy hook for one of your servers`)
}

const checkAndWakeServers = async () => {
    try {
        console.log(`LIST OF SERVERS TO CHECK HEALTH AND WAKE UP: ${[serversToWake]}`)
        serversToWake.forEach(async (url, i) => {
            let message = `currently checking ${url}, please wait...`;
            let server = getOriginalUrl(url)
            logger.info(message)

            let response = await axios.get(url)
         
            if (response.status !== 200 && response.statusText !== 'OK') {
                message = `your server with the url: ${server} is unhealthy as fuck, we'll try to redeploy and send you an email when we're done`
                await sendMail('Server Health', message)
                logger.info(message);

                response = await axios.get(deployHooks[i])
                
                message = response.data.deploy.id ? `${server} redeployed, deploy id: ${response.data.deploy.id}` : `Redeploy failed`
                await sendMail('Server Health', message)
                logger.info(message);
            } else {
                message = `server with url: ${server} is up and running`
                logger.info(message)
            }

            return logger.info(message)
        })
    } catch (e) {
        logger.info(`There was an error checking your servers: ${e.message}`)
    }
}

function getOriginalUrl(route) {
    let parts = route.split('/')
    parts.splice(1, 1, '//')
    return `${parts[0]}${parts[1]}${parts[2]}`
}

setInterval(checkAndWakeServers, process.env.INTERVAL)
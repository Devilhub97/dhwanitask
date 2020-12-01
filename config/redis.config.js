const redis = require('redis')

const client = redis.createClient({
    url: process.env.REDIS_URL
})

client.AUTH(process.env.REDIS_PASSWORD, (err, reply) => {
    if (err) {
        console.log(err)
    } else {
        console.log(reply)
    }
})

client.on('connect', () => {
    console.log("Client connected to redis...")
})

client.on('ready', () => {
    console.log("Client connected to redis and ready to use...")
})

client.on('error', (err) => {
    console.log(err.message)
})

client.on('end', () => {
    console.log("Client disconnected from redis...")
})

process.on('SIGINT', () => {
    client.quit()
})

module.exports = client
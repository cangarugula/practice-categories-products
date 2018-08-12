const {syncAndSeed} = require('./db')
const app = require('./app')

const port = process.env.PORT || 3000

syncAndSeed()

app.listen(port, ()=> {console.log(`listening on port ${port}`)})

const express = require('express')


const app = express()

app.set('secret', 'dhuisdsadas')
app.use(express.json())
app.use(require('cors')())
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/', express.static(__dirname + '/web'))
require('./routes/admin')(app)
require('./routes/web')(app)
require('./pulgins/db')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000');
})
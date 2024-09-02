const app = require('./app')

const PORT = process.env.PORT || 8080
console.log(`Server running on port ${PORT}`);
app.listen(PORT, () => {
    console.log('Server has started')
})

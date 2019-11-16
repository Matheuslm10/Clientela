//Arquivo que inicializa a API
const Express = require('express')

// Criando uma instância do Express
const app = new Express()

app.get('/', (req, res) => {
    res.send("Aqui é a API do clientela!")
})

// "Rodar" a API
app.listen(3000, () => {
    console.log("API pronta e rodando na porta 3000")
})
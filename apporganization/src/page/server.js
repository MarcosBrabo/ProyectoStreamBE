// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile('usuarios.json', 'utf-8', (err, data) => {
    if (err) return res.status(500).send("Error en el servidor.");

    const usuarios = JSON.parse(data);
    const usuario = usuarios.find(u => u.username === username && u.password === password);

    if (usuario) {
      res.send({ message: "Login exitoso", token: "faketoken123" });
    } else {
      res.status(401).send("Usuario o contraseña incorrectos");
    }
  });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  fs.readFile('usuarios.json', 'utf-8', (err, data) => {
    if (err) return res.status(500).send("Error en el servidor.");

    const usuarios = JSON.parse(data);
    const exists = usuarios.find(u => u.username === username);

    if (exists) return res.status(409).send("El usuario ya existe");

    usuarios.push({ username, password });
    fs.writeFile('usuarios.json', JSON.stringify(usuarios), (err) => {
      if (err) return res.status(500).send("Error al guardar el usuario");

      res.send({ message: "Registro exitoso" });
    });
  });
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

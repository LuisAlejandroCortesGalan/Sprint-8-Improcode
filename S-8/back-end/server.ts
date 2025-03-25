import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import mapRoutes from './src/routes/mapRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI= process.env.MONGO_URI || "";

// Middleware
app.use(
    cors({
      origin: "*", 
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type,Authorization", 
    })
  );
  app.use(express.json());

// Conectar a MongoDB Atlas

mongoose.connect(MONGO_URI)
.then(() => console.log('Database connected'))
.catch(err => console.error('Error connecting to the database:', err));

// Usar las rutas
app.use('/api', mapRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("¡El backend está funcionando!");
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

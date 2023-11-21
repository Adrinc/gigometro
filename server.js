import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

// Habilitar CORS para todas las rutas
app.use(cors());

app.get('/ipfy', async (req, res) => {
  try {
    const response = await fetch('https://gigometer43.rtatel.com/ipfy');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

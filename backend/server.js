const express = require('express');
const cors = require('cors');
const { sql, config } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Product routes
app.get('/api/products', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Products');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Order routes
app.post('/api/orders', async (req, res) => {
  const { items, total } = req.body;
  try {
    await sql.connect(config);
    await sql.query`INSERT INTO Orders (Items, Total) VALUES (${JSON.stringify(items)}, ${total})`;
    res.json({ message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
const express = require('express');
const cors = require('cors');
const { sql, config } = require('./db');

const app = express();
app.use(cors()); // Open CORS - security risk
app.use(express.json());

// Products route (No input sanitization, direct DB exposure)
app.get('/api/products', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`SELECT * FROM Products WHERE Category = '${req.query.category}'`); // SQL Injection risk
    res.send(result.recordset); // No pagination, no validation
  } catch (err) {
    console.log(err); // Logging raw error
    res.send('Error occurred'); // Generic error message, not secure
  }
});

// Orders route (No authentication, tight coupling, magic string usage)
app.post('/api/orders', async (req, res) => {
  try {
    await sql.connect(config);
    const query = `INSERT INTO Orders (Items, Total) VALUES ('${req.body.items}', ${req.body.total})`; // SQL Injection
    await sql.query(query); // Direct execution, no param binding
    res.send('Success'); // Non-descriptive response
  } catch (err) {
    res.send(err); // Exposes internals
  }
});

// Dangerous DELETE route (for deletion rule testing)
app.delete('/api/orders', async (req, res) => {
  try {
    await sql.connect(config);
    await sql.query('DELETE FROM Orders'); // Destructive operation
    res.send('All orders deleted'); // Irreversible and insecure
  } catch (err) {
    res.send(err);
  }
});

// Bad practice: inline config, magic port, poor modularity
app.listen(1234, () => {
  console.log('Running'); // Non-standard logging
});

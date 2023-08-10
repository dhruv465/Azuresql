const express = require('express');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(cors());
app.use(express.json());

// Database configuration
const dbConfig = {
  user: 'niriadmin',
  password: 'nadmin@2023',
  server: 'niridb.database.windows.net',
  database: 'testbd',
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

// Registration route
app.post('/api/register', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);

    const {
      First_Name,
      Last_Name,
      Email,
      Phone_Number,
      Password,
      Confirm_Password,
      Gen,
    } = req.body;

    // Basic password validation
    if (Password !== Confirm_Password) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Insert registration data into the database
    const query = `
      INSERT INTO Users (First_Name, Last_Name, Email, Phone_Number, Password, Gender)
      VALUES (@First_Name, @Last_Name, @Email, @Phone_Number, @Password, @Gen)
    `;

    await pool
      .request()
      .input('First_Name', sql.NVarChar, First_Name)
      .input('Last_Name', sql.NVarChar, Last_Name)
      .input('Email', sql.NVarChar, Email)
      .input('Phone_Number', sql.NVarChar, Phone_Number)
      .input('Password', sql.NVarChar, Password)
      .input('Gen', sql.NVarChar, Gen)
      .query(query);

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch submitted data route
app.get('/api/get-submitted-data', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);

    const query = `
      SELECT First_Name, Last_Name, Email, Phone_Number, Gender
      FROM Users
    `;

    const result = await pool.request().query(query);

    const submittedData = result.recordset;

    res.json(submittedData);
  } catch (error) {
    console.error('Error fetching submitted data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const fs= require('fs');
const express = require('express');

const app = express();
/*
app.get('/', (req, res) => {
 // res.send('Hello from Express!');
  res
  .status(200)
  .set('Content-Type', 'application/json')
  .json({ message: 'Hello from Express!', user: 'nirav' });
});

app.post('/', (req,res) => {
  res.send('Post request received!');
});
*/
const tours =JSON.parse(fs.readFileSync('./4-natours/after-section-06/dev-data/data/tours-simple.json')
);
const PORT = 3000;

app.get('/api/v1/tours', (req, res) => {
  
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours
      }
    })
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

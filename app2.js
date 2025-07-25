const fs= require('fs');
const express = require('express');

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  //res.send('Hello from Express!');
  res
  .status(200)
  .set('Content-Type', 'application/json')
  .json({ message: 'Hello from Express!', user: 'nirav' });
});

app.post('/', (req,res) => {
  res.send('Post request received!');
});

const tours =JSON.parse(fs.readFileSync('./4-natours/after-section-06/dev-data/data/tours-simple.json')
);
const PORT = 2000;

app.get('/api/v1/tours', (req, res) => {
  
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours
      }
    })
  });
  app.post('/api/v1/tours',(req,res) =>
  {
//console.log(req.body);
const newId = tours[tours.length - 1].id + 1;
const newTour = Object.assign({ id: newId }, req.body); 
tours.push(newTour);
fs.writeFile('./4-natours/after-section-06/dev-data/data/tours-simple.json', JSON.stringify(tours), err => {
  if (err) {
    console.error('Error writing file:', err);
    res.status(500).send('Internal Server Error');
  } else {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  }
});
//res.send('done')
  })

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

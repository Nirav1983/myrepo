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

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);

 const id=req.params.id * 1; // conver string to number 
 const tour = tours.find(el => el.id === id); 

  if (!tour) 
{
    return res.status(404).json({
      status: 'fail',
      message: 'tour not found'
    });
} 

 /*
 if (id > tours.length) 
{
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
} 
 */

    res.status(200).json({
      status: 'success',
     
     data: {
       tour
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

/*app.patch('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1; // convert string to number
    const tour = tours.find(el => el.id === id);
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Tour not found'
        });
    }

    // Update the tour with the new data
    const updatedTour = Object.assign(tour, req.body);
    fs.writeFile('./4-natours/after-section-06/dev-data/data/tours-simple.json', JSON.stringify(tours), err => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).json({
            status: 'success',
            data: {
                tour: updatedTour
            }
        });
    });    
})
*/

app.delete('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1; // convert string to number
    const tourIndex = tours.findIndex(el => el.id === id);
    
    if (tourIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Tour not found'
        });
    }

    // Remove the tour from the array
    tours.splice(tourIndex, 1);
    
    fs.writeFile('./4-natours/after-section-06/dev-data/data/tours-simple.json', JSON.stringify(tours), err => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    });    
})

/*
app.delete('/api/v1/tours/:id', (req, res) => {
if(req.params.id *1 >tours.length)
{
    return res.status(404).json({
        status: 'fail',
        message: 'Tour not found'
    });
}
res.status(204).json({
    status: 'success',
    data: null
    
})
*/    app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

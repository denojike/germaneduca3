const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const app = express();

//Connect to Database
connectDB();

// Init Middleware for bodyparse
var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/study', require('./routes/api/study'));
app.use('/api/updateStudy/', require('./routes/api/study'));
app.use('/api/searchStudy', require('./routes/api/searchStudy'));
app.use('/api/getAllStudies', require('./routes/api/searchStudy'));
app.use('/api/deleteStudy/', require('./routes/api/study'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`
Server started on port ${PORT} ... `);
});

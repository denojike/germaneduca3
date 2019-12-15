const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route GET api/auth
// @desc Test route
// @access Public
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.log(err.message);
		res.status(500).send(err);
	}
});

// @route POST api/auth
// @desc Login Authenticate user and get token
// @access Public
router.post(
	'/',
	[ check('email', 'please include a valide email').isEmail(), check('password', 'Password is required').exists() ],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			// See if user exists
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ errors: [ { msg: 'Invalid Credentials' } ] });
			}

			//Check password and encrypted password
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ errors: [ { msg: 'Invalid Credentials' } ] });
			}

			//Return jsonwebtoken
			const payload = {
				user: {
					id: user._id,
					name: user.name,
					email: user.email
				}
			};

			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
				if (err) throw error;
				res.json({ token });
			});
		} catch (err) {
			console.log(err.message);
			res.status(500).send(err.message);
		}
	}
);

module.exports = router;

const mongoose = require('mongoose');
const User = require('../model/user'); // Adjust the path as necessary
const MembershipPlan = require('../model/plan'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpError = require('../model/http-error'); // Adjust the path as necessary

// Signup
exports.signup = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
        const { name, email, password } = req.body; // Removed membershipPlan

        // Input validation
        if (!name || !email || !password) {
            throw new HttpError(400, 'All fields are required');
        }

        // Check if user already exists
        const existingUser  = await User.findOne({ email }).session(session);
        if (existingUser ) {
            throw new HttpError(400, 'User  already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save({ session });

        await session.commitTransaction();
        res.status(201).json({ message: 'User  created successfully', user });
    } catch (error) {
        await session.abortTransaction();
        res.status(error.status || 500).json({ message: error.message });
    } finally {
        session.endSession();
    }
};
// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new HttpError(401, 'Invalid credentials');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpError(401, 'Invalid credentials');
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// Get all users
// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find().populate('membershipPlan rentedBooks fines');
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching users', error });
//   }
// };

// Get user by ID
// exports.getUserById = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = await User.findById(userId).populate('membershipPlan rentedBooks fines');
//     if (!user) {
//       throw new HttpError(404, 'User  not found');
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(error.status || 500).json({ message: error.message });
//   }
// };

// Update user by ID
// exports.updateUser  = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = await User.findByIdAndUpdate(userId, req.body, { new: true }).populate('membershipPlan rentedBooks fines');
//     if (!user) {
//       throw new HttpError(404, 'User  not found');
//     }
//     res.json({ message: 'User  updated successfully', user });
//   } catch (error) {
//     res.status(error.status || 500).json({ message: error.message });
//   }
// };

// Delete user by ID
// exports.deleteUser  = async (req, res) => {
//   const userId = req.params.id;
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const user = await User.findById(userId).session(session);
//     if (!user) {
//       throw new HttpError(404, 'User  not found');
//     }

//     // Remove the user from the membership plan
//     const membershipPlan = await MembershipPlan.findById(user.membershipPlan).session(session);
//     membershipPlan.users.pull(userId);
//     await membershipPlan.save({ session });

//     // Delete the user
//     await User.findByIdAndDelete(userId, { session });

//     await session.commitTransaction();
//     res.json({ message: 'User  deleted successfully' });
//   } catch (error) {
//     await session.abortTransaction();
//     res.status(error.status || 500).json({ message: error.message });
//   } finally {
//     session.endSession();
//   }
// };
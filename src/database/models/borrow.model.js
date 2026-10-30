const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'User is required'] 
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'book',
    required: [true, 'Book is required'] 
  },
  borrowedAt: {
    type: Date,
    default: Date.now 
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required'], 
    validate: {
      validator: function(value) {
       
        return value > this.borrowedAt;
      },
      message: 'Due date must be after borrowed date'
    }
  },
  returnedAt: {
    type: Date 
  },
  status: {
    type: String,
    enum: ['borrowed', 'returned', 'overdue'] 
  },
  fine: {
    type: Number, 
    default: 0, 
    min: [0, 'Fine cannot be negative'] 
  }
}, {
   timestamps: true,
    toObject: { vertual: true },
    toJSON: { vertual: true },
});

export const Borrow = mongoose.model('borrow', borrowSchema);


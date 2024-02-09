const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return /^\d{11}$/.test(value);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  orderedProduct: {
    type: String,
    required: true,
  },
  processing: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
});

orderSchema.index({ email: 1 });

orderSchema.post('save', function (error, doc, next) {
  if (error.name === 'ValidationError') {
    const validationErrors = {};
    for (const field in error.errors) {
      validationErrors[field] = error.errors[field].message;
    }
    next(new Error(JSON.stringify(validationErrors)));
  } else {
    next(error);
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

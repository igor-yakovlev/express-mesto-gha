const mongoose = require('mongoose');

const shema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле является обязательным'],
    minlength: [2, "Должно быть больше 2-х символов, сейчас вы ввели '{VALUE}'"],
    maxlength: [30, "Должно быть меньше 30 символов, сейчас вы ввели '{VALUE}'"],
  },
  link: {
    type: String,
    required: [true, 'Поле является обязательным'],
    validate: {
      validator: (v) => /https?:\/\/(w{3})?[a-z0-9-]+\.[a-z0-9\S]{2,}/.test(v),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле является обязательным'],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', shema);

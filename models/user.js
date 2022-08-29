const mongoose = require('mongoose');

const shema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле является обязательным'],
    minlength: [2, "Должно быть больше 2-х символов, сейчас вы ввели '{VALUE}'"],
    maxlength: [30, "Должно быть меньше 30 символов, сейчас вы ввели '{VALUE}'"],
  },
  about: {
    type: String,
    required: [true, 'Поле является обязательным'],
    minlength: [2, "Должно быть больше 2-х символов, сейчас вы ввели '{VALUE}'"],
    maxlength: [30, "Должно быть меньше 30 символов, сейчас вы ввели '{VALUE}'"],
  },
  avatar: {
    type: String,
    required: [true, 'Поле является обязательным'],
  },
});

module.exports = mongoose.model('user', shema);

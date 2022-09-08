const mongoose = require('mongoose');
const validator = require('validator');

const shema = mongoose.Schema({
  name: {
    type: String,
    required: [false],
    default: 'Жак-Ив Кусто',
    minlength: [2, "Должно быть больше 2-х символов, сейчас вы ввели '{VALUE}'"],
    maxlength: [30, "Должно быть меньше 30 символов, сейчас вы ввели '{VALUE}'"],
  },
  about: {
    type: String,
    default: 'Исследователь',
    required: [false],
    minlength: [2, "Должно быть больше 2-х символов, сейчас вы ввели '{VALUE}'"],
    maxlength: [30, "Должно быть меньше 30 символов, сейчас вы ввели '{VALUE}'"],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: [false],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Проверьте правильность ввода Email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Должно быть больше 6 символов, сейчас вы ввели '{VALUE}'"],
  },
});

module.exports = mongoose.model('user', shema);

"use strict";
const bcrypt = require("bcrypt");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static validateEmail(email) {
      const emailPattern = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
      return emailPattern.test(email);
    }

    static validatePassword(password) {
      const hasUpperCase = /[A-Z]/;
      const hasLowerCase = /[a-z]/;
      const hasNumbers = /\d/;
      const hasSpecialCharacters = /[!@#$%^&*()-,.?":{}|<>]/;
      const isValidLength = password.length >= 8;

      if (
        !hasUpperCase.test(password) ||
        !hasLowerCase.test(password) ||
        !hasNumbers.test(password) ||
        !hasSpecialCharacters.test(password) ||
        !isValidLength
      ) {
        return false;
      }

      return true;
    }

    static validateSignInData({ email, password }) {
      if (
        !email ||
        typeof email !== "string" ||
        email.trim().length === 0 ||
        !this.validateEmail(email)
      ) {
        return {
          isValid: false,
          error: "Email не должен быть пустым и должен быть валидным",
        };
      }

      if (
        !password ||
        typeof password !== "string" ||
        password.trim().length === 0 ||
        !this.validatePassword(password)
      ) {
        return {
          isValid: false,
          error:
            "Пароль не должен быть пустым, должен содержать хотя бы одну цифру, одну заглавную букву, одну строчную букву, один специальный символ и быть не менее 8 символов",
        };
      }

      return {
        isValid: true,
        error: null,
      };
    }
    static validateSignUpData({ username, email, password }) {
      if (
        !username ||
        typeof username !== "string" ||
        username.trim().length === 0
      ) {
        return {
          isValid: false,
          error: "Поле username не должно быть пустым",
        };
      }

      if (
        !email ||
        typeof email !== "string" ||
        email.trim().length === 0 ||
        !this.validateEmail(email)
      ) {
        return {
          isValid: false,
          error: "Email должен быть валидным",
        };
      }

      if (
        !password ||
        typeof password !== "string" ||
        password.trim().length === 0 ||
        !this.validatePassword(password)
      ) {
        return {
          isValid: false,
          error:
            "Пароль не должен быть пустым, должен содержать одну большую букву, одну маленькую, один специальный символ, и не должен быть короче 8 символов",
        };
      }

      return {
        isValid: true,
        error: null,
      };
    }
  }
  User.init(
    {
      username: { type: DataTypes.STRING, allowNull: false },
      birthdayDate: { type: DataTypes.DATEONLY, allowNull: true },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user",
      },
      status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (newUser) => {
          const hashedPassword = await bcrypt.hash(newUser.password, 10);
          newUser.password = hashedPassword;
          newUser.email = newUser.email.trim().toLowerCase();
          newUser.username = newUser.username.trim().toLowerCase();
        },
        afterCreate: (newUser) => {
          const rawUser = newUser.get();
          delete rawUser.password;
          return rawUser;
        },
      },
    }
  );
  return User;
};

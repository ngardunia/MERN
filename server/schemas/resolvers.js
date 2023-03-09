const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // find current user and return userData
      return User.findOne({ _id: context.user._id });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      // create new user, sign token, return token and user data
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, args) => {
      // find user, check password, sign token, return token and user data
      return User.findOne({ email: args.email }).then((user) => {
        if (!user) {
          throw new AuthenticationError("Incorrect credentials");
        }

        const correctPw = user.isCorrectPassword(args.password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }

        const token = signToken(user);
        return { token, user };
      });
    },
    saveBook: async (parent, args, context) => {
      // protect route, find current user, update their savedBooks array, return user data
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: args } },
        { new: true }
      );
    },
    removeBook: async (parent, args, context) => {
      // protect route, find current user, update their savedBooks array, return user data
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },   
        { new: true }
      );
    },
  },
}

module.exports = resolvers;

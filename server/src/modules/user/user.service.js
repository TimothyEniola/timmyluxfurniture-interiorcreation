import * as userRepository from "./user.repository.js";

export const getProfile = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
};

export const updateProfile = async (userId, updateData) => {
  // You could add logic here to prevent changing email if you don't want to allow that
  return await userRepository.updateUserProfile(userId, updateData);
};

export const changePassword = async (userId, currentPassword, newPassword) => {
  // 1. Get the current password hash
  const user = await userRepository.findUserPasswordHashById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  // 2. Verify current password
  const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
  if (!isMatch) {
    const error = new Error("Incorrect current password");
    error.statusCode = 400;
    throw error;
  }

  // 3. Hash new password
  const saltRounds = 10;
  const newHash = await bcrypt.hash(newPassword, saltRounds);

  // 4. Update in DB
  await userRepository.updateUserPassword(userId, newHash);
  return { message: "Password updated successfully" };
};


export const addAddress = async (userId, addressData) => {
  return await userRepository.createAddress(userId, addressData);
};

export const getAddresses = async (userId) => {
  return await userRepository.findAddressesByUserId(userId);
};

export const getRecommendations = async (userId) => {
  const products = await userRepository.getGenericRecommendations(5);
  if (products.length === 0) {
    return { message: "No recommendations available yet", products: [] };
  }
  return { products };
};

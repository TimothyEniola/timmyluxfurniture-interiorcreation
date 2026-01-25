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

export const getRecommendations = async (userId) => {
  // 1. Try to get personalized recommendations (e.g., based on last order)
  // ... logic here ...
  
  // 2. Fallback to generic "Newest Arrivals"
  const products = await userRepository.getGenericRecommendations(5);
  
  if (products.length === 0) {
    return { message: "No recommendations available yet", products: [] };
  }
  
  return { products };
};
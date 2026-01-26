import * as userService from "./user.service.js";

export const getCurrentUser = async (req, res, next) => {
  try {
    // req.user comes from your verifyUser middleware
    const user = await userService.getProfile(req.user.id);
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

export const updateCurrentUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateProfile(req.user.id, req.body);
    res.status(200).json({ 
      message: "Profile updated successfully", 
      data: updatedUser 
    });
  } catch (error) {
    next(error);
  }
};

export const updateCurrentUserPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await userService.changePassword(req.user.id, currentPassword, newPassword);
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

// IMPLEMENTED
export const addUserAddress = async (req, res, next) => {
  try {
    const address = await userService.addAddress(req.user.id, req.body);
    res.status(201).json({ 
        message: "Address added successfully", 
        data: address 
    });
  } catch (error) {
    next(error);
  }
};

// IMPLEMENTED
export const getUserAddresses = async (req, res, next) => {
  try {
    const addresses = await userService.getAddresses(req.user.id);
    res.status(200).json({ data: addresses });
  } catch (error) {
    next(error);
  }
};

export const getUserRecommendations = async (req, res, next) => {
  try {
    const recommendations = await userService.getRecommendations(req.user.id);
    res.status(200).json({ data: recommendations });
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req, res, next) => {};

export const getUserWishlist = async (req, res, next) => {};


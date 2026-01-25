import * as authService from "./auth.service.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Call the service
    const result = await authService.register(email, password );

    res.status(201).json({
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Call the service
    const result = await authService.login(email, password);

    res.status(200).json({
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {}

export const logoutUser = async (req, res, next) => {}
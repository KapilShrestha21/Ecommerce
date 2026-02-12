export const isAdmin = (req, res, next) => {
    // req.user is set by verifyJWT middleware
  if (!req.user) {
    return next(new ApiError(401, "Unauthorized"));
  }

  if (req.user.role !== "admin") {
    return next(new ApiError(403, "Admin access only"));
  }

  next(); // user is admin, continue
};

// Middleware to check role based authorization(admin, user, ect) and restrict the route access - Currently not in use
export const authorizeRole = (requiredRole) => {
   return (req, res, next) => {
      if (!req.user) {
         return res.status(403).json({ status: 'error', message: "Unauthorized!" });
      }

      if (req.user.role !== requiredRole) {
         return res.status(403).json({ status: 'error', message: "Forbidden: You do not have access!" });
      }

      next();
   };
};

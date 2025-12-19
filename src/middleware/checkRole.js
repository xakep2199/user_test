function checkRole(roles = []) {
  return (req, res, next) => {
    const user = res.locals.user;

    if (!user) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "Недостаточно прав" });
    }

    next();
  };
}

module.exports = checkRole;

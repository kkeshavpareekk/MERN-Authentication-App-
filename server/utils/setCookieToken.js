const setCookieToken = (user, res) => {
  const token = user.generatejwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRY_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(200).cookie("token", token, options).json({
    success: true,
    token: token,
    user,
  });
};

module.exports = setCookieToken;
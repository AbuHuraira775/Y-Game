const home = (req, res) => {
  try {
    res.json({ message: "Home Server is started here..." });
  } catch (err) {
    console.log(err);
  }
};

const contact = (req, res) => {
  try {
    res.status(200).json({
      state: true,
      message: "Contact Server is started here...",
      date: req.body,
    });
  } catch (err) {
    console.log(err);
  }
};

const login = (req, res) => {
  try {
    res.json({ message: "Login Server is started here..." });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  home,
  contact,
  login,
};

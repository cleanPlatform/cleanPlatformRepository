exports.mainPage = (req, res) => {
  res.render('user.html', {});
};

exports.data = (req, res) => {
  res.json({ look: res.locals.look });
};

exports.myCompany = (req, res) => {
  res.render('company.html', {});
};

exports.companySerivce = (req, res) => {
  res.render('companyService.html', {});
};

exports.reservation = (req, res) => {
  res.render('reservation.html', {});
};

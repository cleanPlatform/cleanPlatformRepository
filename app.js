const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

const path = require('path');
const nunjucks = require('nunjucks');
const jwt = require('jsonwebtoken');

const { isLogin } = require('./middlewares/auth-middleware');
const render = require('./middlewares/render');

require('dotenv').config();

const app = express();
const PORT = 8080;

const router = require('./0router');
const devRouter = require('./devRouter');
const { sequelize } = require('./0models');

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.set('view engine', 'html');

nunjucks.configure('template', {
  autoescape: true,
  express: app,
  watch: true,
});

app.use('/template', express.static(path.join(__dirname, 'template')));
// app.use(express.static(path.join(__dirname, 'template')));

app.use(morgan('dev'));
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/api', router);
app.use('/devapi', devRouter);
``;

app.use(isLogin);

app.get('/', render.mainPage);

app.get('/data', render.data);

app.get('/myCompany', render.myCompany);

app.get('/companyService', render.companySerivce);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err });
});

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});

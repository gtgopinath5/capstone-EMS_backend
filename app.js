const express = require("express");
const userRouter = require("./routes/userRoutes");
const leaveApplicationRouter = require('./routes/leaveApplicationRoutes');
const attendanceRouter = require('./routes/attendanceRoutes');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();

// Define CORS options
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  });
  

// Use CORS middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.head('/api', (req, res) => {
  res.send({ success: 'Welcome to the Job Portal API' });
});

app.use("/api/users", userRouter);
app.use('/api', attendanceRouter);
app.use('/api/leave-applications', leaveApplicationRouter);

module.exports = app;

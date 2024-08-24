const express = require("express");
const userRouter = require("./routes/userRoutes");
const leaveApplicationRouter = require('./routes/leaveApplicationRoutes');
const attendanceRouter = require('./routes/attendanceRoutes');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();

app.use(cors({
    origin: "*",
    credentials: true,
}));

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.head('/api', (req, res) => {
    res.send({ success: 'Welcome to the Job Portal API' });
});

app.use("/api/users", userRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/leave-applications', leaveApplicationRouter);

module.exports = app;

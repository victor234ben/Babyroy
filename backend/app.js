
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const TelegramBot = require('node-telegram-bot-api');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const referralRoutes = require('./routes/referralRoutes');
const adminRoutes = require('./routes/adminRoutes');
const verifyRoutes = require('./routes/verityTaskRoutes')
const cookieParser = require('cookie-parser');
const path = require('path');

const token = process.env.TELEGRAMTOKEN;
const app = express();
app.set('trust proxy', 1);

// Security middleware
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        'https://telegram.org',
        'https://cdn.gpteng.co', // allow GPT Engineer script if needed
        "'unsafe-inline'",       // Optional: allow inline scripts if you're using any
      ],
      connectSrc: ["'self'", 'https://api.telegram.org'],
      frameSrc: ["'self'", 'https://t.me'], // allow Telegram if embedding
      imgSrc: [
        "'self'",
        'data:', // in case you use base64 images
        'https://res.cloudinary.com',
      ],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);
app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:8080", "https://babyroy.onrender.com/"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api', limiter);

const bot = new TelegramBot(token);
bot.setWebHook('https://yourdomain.com/telegram-webhook');
// 📩 Listen for '/start' command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // 👇 Send message with Web App button
  bot.sendMessage(chatId, 'Welcome! Tap below to launch the mini app:', {
    reply_markup: {
      keyboard: [
        [
          {
            text: 'Open BabyRoy Mini App',
            web_app: {
              url: 'https://babyroy.onrender.com/',
            },
          },
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

bot.on("polling_error", console.error);


// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', verifyRoutes)

app.post('/telegram-webhook', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.post('/api/telegram-connected', (req, res) => {
  const { user, connectedAt } = req.body;
  console.log('📲 Telegram Mini App connected!');
  console.log('User info:', user);
  console.log('Time:', connectedAt);

  res.json({ status: 'received' });
})


// Health check route
app.get('/status', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});


app.use(express.static(path.resolve(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  console.log('✅ Frontend resolved for path:', req.originalUrl);
  res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;

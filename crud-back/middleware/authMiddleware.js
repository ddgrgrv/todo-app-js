const admin = require('firebase-admin');
const serviceAccount = require("../serviceAccountKey.json");

// Инициализация Firebase Admin SDK с использованием учетных данных из файла
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Middleware для проверки токена
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Токен не предоставлен' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = { uid: decodedToken.uid }; // Добавляем UID в запрос
    next();
  } catch (error) {
    console.error('Ошибка проверки токена:', error);
    res.status(403).json({ error: 'Неверный токен' });
  }
};

module.exports = authenticateToken;

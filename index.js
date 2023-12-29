const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Используйте cors middleware
app.use(cors());

app.post('/make-request', (req, res) => {
  // Получение данных из фронтенда
  const requestData = req.body;

  // Опции для запроса к другому API
  const apiOptions = {
    hostname: 'https://167.71.33.221/', // Замените на адрес вашего API
    path: requestData.endpoint, // Замените на путь вашего API
    method: 'GET',
    agent: new https.Agent({
      rejectUnauthorized: false
    })
  };

  // Создание запроса к другому API
  const apiRequest = https.request(apiOptions, apiResponse => {
    let data = '';

    // Обработка данных от другого API
    apiResponse.on('data', chunk => {
      data += chunk;
    });

    // Отправка данных обратно на фронтенд после завершения запроса к другому API
    apiResponse.on('end', () => {
      res.json({ result: data });
    });
  });

  // Обработка ошибок при запросе к другому API
  apiRequest.on('error', error => {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  // Завершение запроса к другому API
  apiRequest.end();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const axios = require('axios');
const process = require('process');

const main = async () => {
  console.log('Запущен скрипт уведомления о сборке docker образа');
  console.log('Начинаю получение данных окружения');
  // Получение переменных
  const authorization_key = process.env.TRACKER_AUTHORIZATION_KEY;
  const release_version = process.env.RELEASE_VERSION;

  // Отправка запроса
  console.log('Отправляю запрос на создание комментария о сборке docker');
  await axios.post(
    'https://api.tracker.yandex.net/v2/issues/HOMEWORKSHRI-169/comments',
    {
      text: `Собран docker образ в тегом ${release_version}`,
    },
    {
      headers: {
        Authorization: 'OAuth ' + authorization_key,
        'X-Org-ID': '7526988',
      },
    }
  );
};

main();

const axios = require('axios');
const process = require('process');
const { exec } = require('child_process');

const getLastNumber = (string) => {
  let splitted = string.split('.');
  let number = Number(splitted[splitted.length - 1]);
  return number;
};

const main = async () => {
  console.log('Запущен скрипт создания комментария в тикете');
  console.log('Начинаю получение данных окружения');
  // Получение переменных
  const authorization_key = process.env.TRACKER_AUTHORIZATION_KEY;
  const actor = process.env.ACTOR;
  const release_version = process.env.RELEASE_VERSION;

  console.log('Начинаю получение списка коммитов');
  // Получение списка коммитов
  let query = `git log --pretty=format:"%h %an %s"`;
  let lastNumber = getLastNumber(release_version);
  if (lastNumber > 1) {
    query += ` rc-0.0.${lastNumber - 1}...rc-0.0.${lastNumber}`;
  }
  console.log(`Выполняю '> ${query}'`);
  const data = await new Promise((resolve) =>
    exec(query, (err, data) => resolve(data))
  );
  let splitted = data.split('\n');
  let commits = '';
  for (let i = 0; i < splitted.length; ++i) {
    commits += splitted[i] + '\n';
  }
  let text = `ответственный за релиз ${actor}
коммиты, попавшие в релиз:
${commits}`;

  console.log('Отправляю запрос на внесение информации о релизе');
  // Создание комментария
  await axios.patch(
    'https://api.tracker.yandex.net/v2/issues/HOMEWORKSHRI-169s',
    {
      description: text,
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

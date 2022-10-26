const axios = require('axios');
const process = require('process');
const { exec } = require('child_process');

const getLastNumber = (string) => {
  let splitted = string.split('.');
  let number = Number(splitted[splitted.length - 1]);
  return number;
};

const main = async () => {
  // Получение переменных
  const authorization_key = process.env.TRACKER_AUTHORIZATION_KEY;
  const actor = process.env.ACTOR;
  const release_version = process.env.RELEASE_VERSION;

  console.log('release_version', release_version);

  // Получение списка коммитов
  let query = `git log --pretty=format:"%h %an %s%d"`;
  let lastNumber = getLastNumber(release_version);
  console.log('lastNumber', lastNumber);
  if (lastNumber > 1) {
    query += ` rc-0.0.${lastNumber - 1}...rc-0.0.${lastNumber}`;
  }
  console.log('query', query);
  const data = await new Promise((resolve) =>
    exec(query, (err, data) => resolve(data))
  );
  let splitted = data.split('\n');
  console.log('splitted', splitted);
  let commits = '';
  let end = splitted.length - 1;
  if (lastNumber === 1) {
    end += 1;
  }
  for (let i = 0; i < end; ++i) {
    commits += splitted[i] + '\n';
  }
  console.log(commits);
  let text = `ответственный за релиз ${actor}
коммиты, попавшие в релиз:
${commits}`;

  // Создание комментария
  await axios.post(
    'https://api.tracker.yandex.net/v2/issues/HOMEWORKSHRI-169/comments',
    {
      text,
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

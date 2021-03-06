import { autoService } from 'knifecycle';
import YError from 'yerror';

export default autoService(async function initAuthor({
  inquirer,
  exec,
  lock,
  log,
}) {
  log('debug', '✍️ - Initializing author...');
  const [userName, userEmail] = await Promise.all([
    readGitProperty({ exec, log }, 'user.name'),
    readGitProperty({ exec, log }, 'user.email'),
  ]).catch(err => {
    log('debug', 'Could not get author from Git');
    log('stack', err.stack);
    return [];
  });

  try {
    await lock.take('cli:input');

    const { authorName, authorEmail } = await inquirer.prompt([
      {
        name: 'authorName',
        message: "What's your name?",
        default: userName,
      },
      {
        name: 'authorEmail',
        message: 'You email?',
        default: userEmail,
      },
    ]);

    await lock.release('cli:input');

    return {
      name: authorName,
      email: authorEmail,
    };
  } catch (err) {
    await lock.release('cli:input');
    throw YError.wrap(err);
  }
});

async function readGitProperty({ exec, log }, name) {
  return new Promise((resolve, reject) => {
    exec(`git config --get ${name}`, (err, stdout, stderr) => {
      if (err) {
        log('stack', stderr);
        reject(YError.wrap(err));
        return;
      }
      resolve(stdout.trim());
    });
  });
}

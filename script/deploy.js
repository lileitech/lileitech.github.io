'use strict'

const spawn = require('./lib/spawn');
const pathFn = require('path');
const fs = require('fs');

const args = {
  user: {
    name: 'Hozen',
    email: 'Hozen@live.com',
  },
  baseDir: pathFn.resolve('./', 'dist'),
  repo: {
    url: 'git@github.com:Marie0909/marie0909.github.io.git',
    branch: 'master',
  },
};

deployToGit(args);

function deployToGit(args) {
  const message = args.message || `Site updated: ${(new Date()).toDateString()}`
  const baseDir = args.baseDir;
  const gitDir = pathFn.join(baseDir, '.git');

  if (!args.repo) {
    return console.log('Please check configs of repository!')
  }

  if (!fs.existsSync(baseDir)) {
    throw new Error('Please build before deploy')
  }
  if (!fs.existsSync(gitDir)) {
    setup()
      .then(() => push(args.repo));
  } else {
    push(args.repo);
  }

  function git(...args) {
    return spawn('git', args, {
      cwd: baseDir,
      stdio: 'inherit'
    });
  }

  function setup() {
    const userName = args.user && args.user.name || '';
    const userEmail = args.user && args.user.emial || '';

    return git('init').
      then(() => git('config', 'user.name', userName)).
      then(() => git('config', 'user.email', userEmail)).
      then(() => git('add', '-A')).
      then(() => git('commit', '-m', message));
  }

  function push(repo) {
    return git('add', '-A').
      then(() => git('commit', '-m', message).catch(() => '')).
      then(() => git('push', '-u', repo.url, 'HEAD:' + repo.branch, '--force'));
  }
}
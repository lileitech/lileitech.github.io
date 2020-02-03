'use strict'

const { spawn } = require('child_process')

function promiseSpawn(command, args, options) {
  if (!command) throw new TypeError('command is reuqired');

  if (!options && args && !Array.isArray(args)) {
    options = args;
    args = [];
  }

  args = args || [];
  options = options || {};

  return new Promise((resolve, reject) => {
    const task = spawn(command, args, options);
    const encoding = options.hasOwnProperty('encoding') ? options.encoding : 'utf8';

    if (task.stdout) {
      task.stdout.pipe(process.stdout);
    }

    if (task.stderr) {
      task.stderr.pipe(process.stdout)
    }

    task.on('close', code => {
      if (code) {
        const e = new Error('command execute failed');
        e.code = code;

        return reject(e);
      }

      resolve();
    });

    task.on('error', reject)

    if (!task.stderr && !task.stdout) {
      task.on('exit', code => {
        if (code) {
          const e = new Error('Spawn failed');
          e.code = code;
          
          return reject(e);
        }
      });
    }
  });
}

module.exports = promiseSpawn;

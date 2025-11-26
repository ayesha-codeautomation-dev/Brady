// For VSCode users, run export editor="code" before this command in the terminal
// Document IDs can be found using either the CLI or Vision tab in the studio

const { spawn } = require('child_process');

const [documentId] = process.argv.slice(2);

if (!documentId) {
  throw new Error('No document id was provided.');
}

spawn('sanity', ['documents', 'create', '--id', documentId, '--watch', '--replace'], {
  cwd: process.cwd(),
  stdio: 'inherit'
});

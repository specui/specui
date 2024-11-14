import readline from 'readline';

export function prompter() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  };
}

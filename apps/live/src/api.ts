import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, join, normalize } from 'path';
import { existsSync } from 'fs';

if (!process.env.CWD) {
  throw new Error('CWD is required');
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

const cwd = normalize(process.env.CWD);

app.post('/update', async (req, res) => {
  res.status(200).json({}).end();

  const { files } = req.body as {
    files: Record<string, string>;
  };

  const filesArray = Object.entries(files);

  for (let i = 0; i < filesArray.length; i++) {
    const parts = filesArray[i];
    const file = join(cwd, parts[0]);
    const content = parts[1];
    const dir = dirname(file);
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }
    const existing = await readFile(file, 'utf8');
    if (existing !== content) {
      console.log('Writing...');
      await writeFile(file, content);
    }
  }
});

app.listen(8080, () => {
  console.log('Listening on port 8080...');
});

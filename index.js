import fs from 'fs';
import { scrapper } from './machine.js';

const getAll = async () => {
  const data = [];

  const friend = 245220;

  for (let id = friend + 5; id > friend - 5; id--) {
    const user = scrapper(id);
    console.log({ user });
    data.push(user);
  }
  return await Promise.all(data);
};

const main = async (row = 1) => {
  const requests = await getAll();

  fs.writeFileSync(`users-${row}.json`, JSON.stringify(requests));
};

main();

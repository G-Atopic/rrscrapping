import fs from 'fs';
import { scrapper } from './machine.js';

const getAll = async (step) => {
  const request = [];

  const lastId = 475157 - step * 10;
  console.log(`tranzendo do ID:${lastId + 5} até o ID:${lastId - 5}`);
  for (let id = lastId + 5; id > 475157 - 5; id--) {
    const user = scrapper(id);
    request.push(user);
  }
  Promise.all(request).then((data) => {
    fs.writeFileSync(`users-${step}.json`, JSON.stringify(data));
  });
};

const main = async () => {
  for (let step = 0; step < 100; step++) {
    await getAll(step);
  }
};

main();

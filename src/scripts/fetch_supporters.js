#!/usr/bin/env node
const fs = require('fs');
const request = require('request');

const REQUIRED_KEYS = ['totalDonations', 'id'];
const filename = '_supporters.json'

request('https://opencollective.com/api/groups/webpack/backers', (err, response, body) => {
  if (err) console.error('Failed to fetch backers: ', err);

  // Basic validation
  const content = JSON.parse(body);

  if (!Array.isArray(content)) throw new Error('Supporters data is not an array.');
  if (content.length < 400) throw new Error('Supporters data is incomplete.');
  for (const item of content) {
    for (const key of REQUIRED_KEYS) {
      if (!item || typeof item !== 'object') throw new Error(`Supporters: ${JSON.stringify(item)} is not an object.`);
      if (!(key in item)) throw new Error(`Supporters: ${JSON.stringify(item)} doesn't include ${key}.`);
    }
  }

  // Write the file
  fs.writeFile(`./src/components/Support/${filename}`, body, err => {
    if (err) {
      console.error(`Failed to write ${filename} file: `, err);

    } else console.log(`Fetched 1 file: ${filename}`);
  });
});

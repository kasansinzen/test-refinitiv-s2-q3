const htmlParser = require("node-html-parser");
const https = require("https");

const fund = process.argv[2] || "";
const { parse } = htmlParser;
const options = {
  host: 'codequiz.azurewebsites.net',
  path: "/",
  headers: {'Cookie': "hasCookie=true"}
};
let html = "";

https.request(options, (res) => {
  res.setEncoding('utf8');
  res.on('data', (body) => html += body);
  res.on('end', () => {
    const root = parse(html);
    const items = [];
    let navValue;
    
    root.querySelectorAll('td').forEach(item => items.push(item.textContent.trim()));
    items.forEach((item, key) => {
      if(item == fund) navValue = items[key+1];
    });

    if(navValue) console.log("Nav = ", navValue);
    else console.log("Fund Invalid");
  })
}).end();
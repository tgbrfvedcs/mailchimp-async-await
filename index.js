const querystring = require('querystring');
const https = require('https');

const url = 'https://us4.api.mailchimp.com/3.0/';
const apikey = '3609d8d80608b4c45305dbbde64a1a2f-us4';

const createList = () => {
  let qs =
    '{"name":"Freddie\'s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You\'re receiving this email because you signed up for updates about Freddie\'s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}';
  let option = {
    auth: 'user:' + apikey,
    method: 'POST',
    header: { 'content-type': 'application/json' }
  };

  const req = https.request(url, option, function(res) {
    console.log('STATUS: ' + res.statusCode);
    res.on('data', chunk => {
      let reply = JSON.parse(chunk);
      debugger;
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  req.write(data);
  req.end();
};
createList();

// {
//     name: 'bar',
//     contact: {
//       company: 's',
//       address1: 'eryjkfwef',
//       city: 'taiepi',
//       state: 'goin',
//       zip: '106',
//       country: 'taiwan'
//     },
//     permission_reminder: 'reminder',
//     campaign_defaults: {
//       from_name: 'casey',
//       from_email: 'tgbrfv@gmail.com',
//       subject: 'party night',
//       language: 'ENG'
//     },
//     email_type_option: true
//   }
// const https = require('https');
// const options = {
//   hostname: 'us4.api.mailchimp.com/3.0/',
//   path: '/todos',
//   method: 'GET'
// };

// const req = https.request(options, res => {
//   console.log(`statusCode: ${res.statusCode}`);

//   res.on('data', d => {
//     process.stdout.write(d);
//   });
// });

// req.on('error', error => {
//   console.error('s' + error);
// });

// req.end();

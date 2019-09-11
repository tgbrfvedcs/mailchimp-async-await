const https = require('https');

const apikey = '3609d8d80608b4c45305dbbde64a1a2f-us4';

const createList = () => {
  let data = JSON.stringify({
    name: "Freddie's Favorite Hats",
    contact: {
      company: 'Mailchimp',
      address1: '675 Ponce De Leon Ave NE',
      address2: 'Suite 5000',
      city: 'Atlanta',
      state: 'GA',
      zip: '30308',
      country: 'US',
      phone: ''
    },
    permission_reminder:
      "You're receiving this email because you signed up for updates about Freddie's newest hats.",
    campaign_defaults: {
      from_name: 'Freddie',
      from_email: 'freddie@freddiehats.com',
      subject: '',
      language: 'en'
    },
    email_type_option: true
  });
  const options = {
    hostname: 'us4.api.mailchimp.com',
    port: 443,
    auth: 'user:' + apikey,
    path: '/3.0/lists',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Length': data.length
    }
  };
  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
      process.stdout.write(d);
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  req.write(data);
  req.end();
};

const getList = () => {
  const options = {
    hostname: 'us4.api.mailchimp.com',
    port: 443,
    auth: 'user:' + apikey,
    path: '/3.0/lists',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Length': data.length
    }
  };
  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
      console.log(JSON.parse(d));
      debugger;
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  req.end();
};

const addMember = () => {
  const id = '0f4163ce7b';
  let data = JSON.stringify({
    members: [{ email_address: 'sfhryjt@gmail.com', status: 'subscribed' }]
  });
  const options = {
    hostname: 'us4.api.mailchimp.com',
    port: 443,
    auth: 'user:' + apikey,
    path: '/3.0/lists/' + id,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Length': data.length
    }
  };
  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
      //   process.stdout.write(d);
      debugger;
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  req.write(data);
  req.end();
};

const getCampaigns = () => {
  const options = {
    hostname: 'us4.api.mailchimp.com',
    port: 443,
    auth: 'user:' + apikey,
    path: '/3.0/campaigns',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Length': data.length
    }
  };
  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
      console.log(JSON.parse(d));
      debugger;
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  req.end();
};

const sendCampaigns = () => {
  const id = '5844381db2';
  let data = JSON.stringify({
    members: [{ email_address: 'sfhryjt@gmail.com', status: 'subscribed' }]
  });
  const options = {
    hostname: 'us4.api.mailchimp.com',
    port: 443,
    auth: 'user:' + apikey,
    path: '/3.0/campaigns/' + id + '/actions/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };
  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
      //   process.stdout.write(d);
      debugger;
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  req.write(data);
  req.end();
};

getCampaigns();

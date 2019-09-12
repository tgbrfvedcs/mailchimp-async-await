const https = require('https');

module.exports = class MailService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  //Settings for making https request
  getOptions = (path, method, dataLength) => {
    return {
      hostname: this.apiKey.slice(-3) + '.api.mailchimp.com',
      port: 443,
      auth: 'user:' + this.apiKey,
      path: '/3.0/' + path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': dataLength !== undefined ? dataLength : null
      }
    };
  };
  request = (options, data) => {
    //Return response from mailchimp with GET method
    if (options.method === 'GET') {
      return new Promise((resolve, reject) => {
        const req = https.request(options, res => {
          req.on('error', error => {
            console.error(error);
          });

          res.on('data', d => {
            if (res.statusCode !== 200) {
              console.error(`statusCode: ${res.statusCode}`);
              reject(JSON.parse(d));
            }
            resolve(JSON.parse(d));
          });
        });

        req.end();
      });
    } else if (options.method === 'POST') {
      //return response from mailchimp if statusCode = 200,
      //otherwise return false.
      return new Promise((resolve, reject) => {
        const req = https.request(options, res => {
          req.on('error', error => {
            reject(error);
          });

          res.on('data', d => {
            let result = JSON.parse(d);
            if (res.statusCode !== 200) {
              console.error(`statusCode: ${res.statusCode}`);
              resolve(result);
            }
            resolve(result);
          });
        });

        req.write(data);
        req.end();
      });
    }
  };

  getList = () => {
    const options = this.getOptions('lists', 'GET');
    return this.request(options);
  };

  getCampaigns = () => {
    const options = this.getOptions('campaigns', 'GET');
    return this.request(options);
  };

  getTemplates = () => {
    const options = this.getOptions('templates', 'GET');
    return this.request(options);
  };

  createList = listInfo => {
    let data = JSON.stringify(listInfo);
    const options = this.getOptions('lists', 'POST', data.length);
    return this.request(options, data);
  };

  addMember = (listID, members) => {
    let data = JSON.stringify(members);
    const options = this.getOptions('lists/' + listID, 'POST', data.length);
    return this.request(options, data);
  };

  createTemplate = data => {
    data = JSON.stringify(data);
    const options = this.getOptions('templates', 'POST', data.length);
    return this.request(options, data);
  };

  createCampaigns = data => {
    data = JSON.stringify(data);
    const options = this.getOptions('campaigns', 'POST', data.length);
    return this.request(options, data);
  };

  sendCampaigns = campaignID => {
    const options = this.getOptions(
      'campaigns/' + campaignID + '/actions/send',
      'POST',
      0
    );
    return new Promise((resolve, reject) => {
      const req = https.request(options, res => {});
      req.on('error', error => {
        reject(error);
      });
      resolve(true);
      req.end();
    });
  };
};

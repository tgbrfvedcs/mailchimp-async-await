const MailChimp = require('./mailchimp');
const {
  sampleTemplate,
  sampleList,
  sampleCampaign,
  sampleMembers
} = require('./sampleDatas');

const apiKey = 'api-key'; // Get this from your account on mailchimp.com

const mailchimp = new MailChimp(apiKey);

const createList = async () => {
  //create list
  let result = await mailchimp.createList(sampleList);
  console.log(x ? 'Created' : 'Fail');
  return [result.id];
};

const getLists = async () => {
  let result = await mailchimp.getList();
  if (result.title) {
    throw new Error(result.detail);
  }
  console.log('Lists: ');
  result.lists.forEach((list, index) => {
    console.log(
      `${index}: ID: ${list.id}  Name: ${list.name}  Date_created: ${list.date_created}`
    );
  });
  return result.lists;
};

const addMembers = async listID => {
  //add members to a list
  console.log(
    (await mailchimp.addMember(listID, sampleMembers)) ? 'Member added' : 'Fail'
  );
};

const createTemplate = async () => {
  let template = await mailchimp.createTemplate(sampleTemplate);
  if (template) {
    sampleCampaign.settings.template_id = template.id;
  }
  console.log('Template created');
};

const createCampaign = async () => {
  //create campaign
  let campaign = await mailchimp.createCampaigns(sampleCampaign);
  console.log('Campaign created');
  return campaign.id;
};

//main
(async () => {
  try {
    let lists = await getLists();
    if (lists.length === 0) {
      lists = await createList();
    }

    //Provide a list for creatiing a campaign later
    sampleCampaign.recipients.list_id = lists[0].id;

    await addMembers(lists[0].id);
    await createTemplate();
    let campaignID = await createCampaign();

    console.log(
      (await mailchimp.sendCampaigns(campaignID)) ? 'Campaign sended' : 'Fail'
    );
  } catch (e) {
    console.log(e);
  }
})();

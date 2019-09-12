const MailChimp = require('./mailchimp');
const {
  myEmail,
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

const addMembers = async (listID, emails) => {
  //add members to a list
  console.log(
    (await mailchimp.addMember(listID, emails)) ? 'Member added' : 'Fail'
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
    // Create a new list if no list existed and get the list ID
    let lists = await getLists();
    if (lists.length === 0) {
      lists = await createList();
    }

    //Provide a list for creating a campaign
    sampleCampaign.recipients.list_id = lists[0].id;

    // Add my email to the list
    await addMembers(lists[0].id, myEmail);
    // Add a few other valid emails
    await addMembers(lists[0].id, sampleMembers);

    // Before sending campaign, we create a template and  campaign
    await createTemplate();
    let campaignID = await createCampaign();

    // Send out a campaign from Mailchimp to everyone in the list
    console.log(
      (await mailchimp.sendCampaigns(campaignID)) ? 'Campaign sended' : 'Fail'
    );
  } catch (e) {
    console.log(e);
  }
})();

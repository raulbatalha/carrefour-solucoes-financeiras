module.exports = {
    addResponse: (res) => {
      console.log('\n--- RESPONSE ---');
      console.log('Status:', res.status);
      console.log('Body:', JSON.stringify(res.body, null, 2));
    }
  };
  const { AllureRuntime, AllureStep, ContentType } = require('allure-js-commons');

function addResponse(response) {
  if (process.env.ALLURE === 'true') {
    const allure = global.allure;
    if (allure && response) {
      allure.attachment('HTTP Response', JSON.stringify(response.body, null, 2), ContentType.JSON);
    }
  }
}

module.exports = {
  addResponse
};

const POST_URL = "INSERT URL HERE";

function onSubmit(e) {
  let form = FormApp.getActiveForm();
  let submissionDate = e?.response?.getTimestamp() ?? new Date();

  let webhookBody = {
    username: "Form Notifications",
    embeds: [{
      title: `${form.getTitle()} - New Submission`,
      color: 7489721,
      url: form.getPublishedUrl(),
      timestamp: submissionDate.toISOString(),
      fields: [
        {
          name: "# Submissions",
          value: form.getResponses().length
        }
      ]
    }]
  }

  UrlFetchApp.fetch(POST_URL, {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(webhookBody)
  })
}


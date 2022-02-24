async function newFormHandler(event) {
  event.preventDefault();

  const company_name = document.querySelector(
    'input[name="company_name"]'
  ).value;
  const title = document.querySelector('input[name="title"]').value;
  const description = document.querySelector('input[name="description"]').value;
  const location = document.querySelector('input[name="location"').value;
  const job_url = document.querySelector('input[name="job_url"').value;

  const response = await fetch(`/api/jobs`, {
    method: "POST",
    body: JSON.stringify({
      company_name,
      title,
      description,
      location,
      job_url,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/jobs");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-job-form")
  .addEventListener("submit", newFormHandler);

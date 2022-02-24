async function newFormHandler(event) {
  event.preventDefault();

  const company = document.querySelector('input[name="company"]').value;
  const title = document.querySelector('input[name="title"]').value;
  const description = document.querySelector('input[name="description"]').value;

  const response = await fetch(`/api/interviews`, {
    method: "POST",
    body: JSON.stringify({
      company,
      title,
      description,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/interview-experiences");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-interview-form")
  .addEventListener("submit", newFormHandler);

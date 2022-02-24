async function newFormHandler(event) {
  event.preventDefault();
  
  const title = document.querySelector('input[name="title"]').value.trim();
  const code_url = document.querySelector('input[name="code-url"]').value.trim();

  const response = await fetch(`/api/codes`, {
    
    method: "POST",
    body: JSON.stringify({
      title,
      code_url,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log('hey');
  if (response.ok) {
    document.location.replace("/coding-challenges");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-challenge-form")
  .addEventListener("submit", newFormHandler);

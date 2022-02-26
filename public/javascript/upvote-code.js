async function upvoteClickHandler(event) {
  event.preventDefault();
  console.log("upvoted!");

  const id = event.srcElement.id;

  console.log(id);
  const response = await fetch("/api/codes/upvote", {
    method: "PUT",
    body: JSON.stringify({
      code_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // if (response.ok) {
  //   document.location.reload();
  // } else {
  //   alert(response.statusText);
  // }
}

document
  .querySelector(".upvote-btn")
  .addEventListener("click", upvoteClickHandler);

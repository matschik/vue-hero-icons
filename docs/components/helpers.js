export function copyToClipboard(value) {
  const $input = document.createElement("input");
  $input.type = "text";
  $input.value = value;
  document.body.appendChild($input);
  $input.select();

  try {
    document.execCommand("copy");
    // TODO: notify copy to clipboard success
  } catch (err) {
    // TODO: notify copy to clipboard error
    alert("Oops, unable to copy");
  }

  $input.remove();
}

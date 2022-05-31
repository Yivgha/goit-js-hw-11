export function checkRequest(response) {
  if (response.hits.length === 0) {
    return;
  }

  return response;
}
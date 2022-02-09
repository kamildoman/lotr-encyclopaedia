const token = "Bearer 2EzgPtgDeGNz2zLjBt62";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: token,
};

export const getData = (category?: string): Promise<[]> => {
  return fetch("https://the-one-api.dev/v2/" + category, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      return data["docs"];
    });
};

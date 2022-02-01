const token: string = "Bearer KZiRfoGjloEi9WkMp1AH";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: token,
};

export const getData = (category?: string): Promise<any> => {
  return fetch("https://the-one-api.dev/v2/" + category, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      return data["docs"];
    });
};

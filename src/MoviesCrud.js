// will contain all the function to handle the CRUD regarding Movies

const mockUrl = "https://650e6d5754d18aabfe9926a0.mockapi.io";

export const createMovie = async (movieData) => {
  const response = await fetch(`${mockUrl}/movies`, {
    method: "POST",
    body: JSON.stringify(movieData),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return await response.json();
};

export const getAllMovies = async () => {
  const response = await fetch(`${mockUrl}/movies`);
  return await response.json();
};

export const removeMovie = async (movieId) => {
  const response = await fetch(`${mockUrl}/movies/${movieId}`, {
    method: "DELETE",
  });
  return response.json();
};

export const editMovie = async (movieData, movieId) => {
  const response = await fetch(`${mockUrl}/movies/${movieId}`, {
    method: "PUT",
    body: JSON.stringify(movieData),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return await response.json();
};

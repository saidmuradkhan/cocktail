import axios from 'axios';

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export const fetchRandomCocktailService = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/random.php`);
    return response.data;
  } catch (error) {
    console.error("Error in fetchRandomCocktailService:", error);
    throw error;
  }
};

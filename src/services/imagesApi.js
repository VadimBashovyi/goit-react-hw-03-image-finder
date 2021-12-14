import axios from 'axios'

const API_KEY = '23995871-fe98d17cce7b68bafdd00c7d5'

axios.defaults.baseURL = 'https://pixabay.com/api/'

const fetchData = ({ searchQuery = '', currentPage = 1 }) => {
  return axios
    .get(
      `/?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then((response) => response.data.hits)
}

export default { fetchData }

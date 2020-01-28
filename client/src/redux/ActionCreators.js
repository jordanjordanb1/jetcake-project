import axios from 'axios'
import config from '../config'

axios.defaults.baseURL = config.url // Sets base URL in axios

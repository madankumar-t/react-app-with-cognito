import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export async function getFiles() {
  const res = await axios.get(`${API_ENDPOINT}/s3-files`);
  return res.data;
}

export async function getLockStatus() {
  const res = await axios.get(`${API_ENDPOINT}/list`);
  return res.data;
}

export async function lockFile(filename, user) {
  await axios.post(`${API_ENDPOINT}/lock`, { filename, user });
}

export async function unlockFile(filename) {
  await axios.post(`${API_ENDPOINT}/unlock`, { filename });
}

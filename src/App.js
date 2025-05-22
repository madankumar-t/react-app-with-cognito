import React, { useEffect, useState } from "react";
import FileTable from "./components/FileTable";
import { getFiles, getLockStatus } from "./services/api";
import { withAuthenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import './aws-exports';

function App({ signOut, user }) {
  const [files, setFiles] = useState([]);
  const [locks, setLocks] = useState({});

  useEffect(() => {
    async function fetchData() {
      const fileList = await getFiles();
      const lockData = await getLockStatus();
      const lockMap = {};
      lockData.forEach(lock => {
        lockMap[lock.filename] = lock;
      });
      setFiles(fileList || []);
      setLocks(lockMap);
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>S3 File Lock UI</h1>
      <p>Welcome, {user?.username}</p>
      <button onClick={signOut}>Sign Out</button>
      <FileTable files={files} locks={locks} username={user?.username} />
    </div>
  );
}

export default withAuthenticator(App);

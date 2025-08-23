import { onSnapshot, collection, query, where } from "firebase/firestore";
import { database } from "@/firebaseConfig";
import { useEffect, useState } from "react";

let files = collection(database, "files");

export const fetchAllFiles = (userEmail: string) => {
  const [fileList, setFileList] = useState<FileListProps[]>([]);

  const allFiles = () => {
    if (userEmail) {
      const getUserFiles = query(files, where("userEmail", "==", userEmail));
      onSnapshot(getUserFiles, (res) => {
        return setFileList(
          res.docs.map((doc) => {
            const fileExtension = doc
              .data()
              .fileName?.split(".")
              .pop()
              ?.toLowerCase();
            return {
              ...doc.data(),
              id: doc.id,
              fileName: doc.data().fileName,
              fileExtension: fileExtension,
              fileLink: doc.data().fileLink,
              folderId: doc.data().folderId,
              folderName: doc.data().folderName,
              isFolder: doc.data().isFolder,
              isStarred: doc.data().isStarred,
              isTrashed: doc.data().isTrashed,
            };
          }),
        );
      });
    }
  };

  useEffect(() => {
    allFiles();
  }, [userEmail]);

  return fileList;
};

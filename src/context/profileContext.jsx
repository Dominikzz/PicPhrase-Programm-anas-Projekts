import { createContext, useContext, useState, useEffect } from 'react';
import { dataBase } from '../firebase.jsx';
import { useAuth } from './authContext.jsx';
import { getDoc, doc, collection, getDocs, setDoc, updateDoc } from "firebase/firestore"; 
import { storage } from "../firebase.jsx";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useLanguages } from './languageContext.jsx';

const profileContext = createContext();

export const useProfile = () => {
    return useContext(profileContext)
}

export const ProfileProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const { changeLanguage } = useLanguages();

    const [currentProfile, setCurrentProfile] = useState('');
    const [documentIds, setDocumentIds] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

// Load profile photo when user enters the website and set it to local storage
    useEffect(() => {
        if (currentUser) {
            const loadProfilePhoto = async () => {
                const imageRef = ref(storage, `profilePictures/${currentUser.uid}`);
                try {   
                    const downloadURL = await getDownloadURL(imageRef);
                    localStorage.setItem(`profilePicture-${currentUser.uid}`, downloadURL);
                    setProfilePicture(downloadURL);
                } catch (error) {
                    setProfilePicture(null);
                }
            }
            loadProfilePhoto();
        } else {
            setProfilePicture(null);
        }
    }, [currentUser])

// Fetch profile photo from firebase storage when user changes it
    const fetchProfilePhoto = async () => {
        const imageRef = ref(storage, `profilePictures/${currentUser.uid}`);
        try {   
            const downloadURL = await getDownloadURL(imageRef);
            localStorage.setItem(`profilePicture-${currentUser.uid}`, downloadURL);
            setProfilePicture(downloadURL);
        } catch (error) {
            setProfilePicture(null);
        }
    }

// Upload new profile photo to firebase storage
    const uploadProfilePhoto = (e) => {
        const photo = e.target.files[0]

        if (photo) {
            const imageRef = ref(storage, `profilePictures/${currentUser.uid}`)
            uploadBytes(imageRef, photo).then(() => {
                fetchProfilePhoto();
            })
        }
    }

// fetch user profile data when user enters the website
    useEffect(() => {
        const profileData = async () => {
            try {
                const userDocRef = doc(dataBase, 'userAccounts', currentUser.uid);
                const userData = await getDoc(userDocRef);

                if (userData.exists()) {
                    setCurrentProfile({ ...userData.data(), id: userData.id });
                } else {
                    return
                }
            } catch (error) {
                console.error(error);
                return null;
            }
        };

        if (currentUser) {
            profileData();
        }
    }, [currentUser]);

// fetch all user document ids when user enters the website to compare with the current user
    useEffect(() => {
        const getAllDocumentIds = async () => {
            try {
                const profilesCollectionRef = collection(dataBase, 'userAccounts');
                const profilesSnapshot = await getDocs(profilesCollectionRef);
                const documentIds = profilesSnapshot.docs.map(doc => doc.id);
                return setDocumentIds(documentIds);
            } catch (error) {
                console.error(error);
                return null;
            }
        };

        getAllDocumentIds();
    }, []);

    useEffect(() => {
        if (currentProfile) {
            changeLanguage(currentProfile.nativeLanguageCode);
        }
    } , [currentProfile])

    const addToProfile = async (data) => {
        try {
            const userDocRef = doc(dataBase, 'userAccounts', currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            const userData = userDocSnap.data();
            
            await setDoc(userDocRef, {
                ...userData,
                [`${data}`]: 0,
            });
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const updateProfile = async (field, data) => {
        try {
            const userDocRef = doc(dataBase, 'userAccounts', currentUser.uid);
            await updateDoc(userDocRef, {
                [`${field}`]: data,
            });
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const value = {
        currentProfile,
        documentIds,
        profilePicture,
        uploadProfilePhoto,
        addToProfile,
        updateProfile,
    };

    return (
        <profileContext.Provider value={value}>
            {children}
        </profileContext.Provider>
    );
};

  
  
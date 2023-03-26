import { createContext, useContext, useReducer, useState } from "react";
import axios from 'axios';
import { SERVER_URL } from "../utils/data";
import { AuthContext } from "./auth-context";
import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { database } from "../utils/firebase";

export const AppContext = createContext({
    chatState: {},
    fields: [],
    firebaseUsers: [],
    answerQuestion: (form) => {},
    askQuestion: (form) => {},
    dispatch: () => {},
    firebaseHandleChatSelect: (selectedUser) => {},
    followUser: (id) => {},
    getFields: () => {},
    getFirebaseUsers: () => {},
    getSimilarQuestions: (id) => {},
    getTopQuestions: () => {},
    getUserDetails: (id) => {},
    questionAnswers: (id) => {},
    search: (inp) => {},
    singleQuestion: (id) => {},
    unfollowUser: (id) => {},
    unvoteAnswer: (id) => {},
    userQuestions: (id) => {},
    voteAnswer: (id) => {},
});

const AppContextProvider = ({ children }) => {
    const { profile, setProfile, firebaseUser } = useContext(AuthContext);

    const INITIAL_CHAT_STATE = { chatId: "", user: {} };

	const chatReducer = (state, action) => {
		switch (action.type) {
			case "CHANGE_USER":
				return {
					user: action.payload,
					chatId:
						firebaseUser?.uid > action.payload?.uid
							? firebaseUser?.uid + action.payload?.uid
							: action.payload?.uid + firebaseUser?.uid,
				};

			default:
				return state;
		}
	};

    const [fields, setFields] = useState([]);
    const [firebaseUsers, setFirebaseUsers] = useState([]);
    const [chatState, dispatch] = useReducer(chatReducer, INITIAL_CHAT_STATE);

    const getFirebaseUsers = async () => {
        try {
            const response = await getDocs(collection(database, 'newUsers'));
            const theUsers = [];
            response.forEach((d) => {
                theUsers.push(d.data());
            });
            setFirebaseUsers(theUsers);
        } catch (err) {
            throw err;
        }
    };

    const firebaseHandleChatSelect = async (selectedUser) => {
		const combination =
			firebaseUser?.uid > selectedUser?.uid
				? firebaseUser?.uid + selectedUser?.uid
				: selectedUser?.uid + firebaseUser?.uid;
		try {
			const res = await getDoc(doc(database, "chats", combination));

			if (!res.exists()) {
				await setDoc(doc(database, "chats", combination), { messages: [] });

				await updateDoc(doc(database, "userChats", firebaseUser.uid), {
					[combination + ".userInfo"]: {
						uid: selectedUser.uid,
						displayName: selectedUser.displayName,
						photoURL: selectedUser.photoURL,
						email: selectedUser.email,
					},
					[combination + ".date"]: serverTimestamp(),
				});

				await updateDoc(doc(database, "userChats", selectedUser.uid), {
					[combination + ".userInfo"]: {
						uid: firebaseUser.uid,
						displayName: firebaseUser.displayName || firebaseUser.email,
						photoURL:
							firebaseUser.photoURL ||
							"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
						email: firebaseUser.email,
					},
					[combination + ".date"]: serverTimestamp(),
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

    const getFields = async () => {
        try {
            const { data } = await axios.get(`${SERVER_URL}/fields`);
            setFields(data.fields);
        } catch (err) {
            throw err;
        }
    }

    const getTopQuestions = async () => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${profile?.token}` } };
            const { data } = await axios.get(`${SERVER_URL}/top-questions`, config);
            return data.questions;
        } catch (err) {
            throw err;
        }
    };

    const getSimilarQuestions = async (id) => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${profile?.token}` } };
            const { data } = await axios.get(`${SERVER_URL}/related-questions/${id}`, config);
            return data.questions;
        } catch (err) {
            throw err;
        }
    }

    const askQuestion = async (form) => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${profile?.token}` } };
            await axios.post(`${SERVER_URL}/add-question`, form, config);
        } catch (err) {
            throw err;
        }
    };

    const singleQuestion = async (id) => {
        try {
            const { data } = await axios.get(`${SERVER_URL}/question/${id}`);
            return data.question;
        } catch (err) {
            throw err;
        }
    };

    const questionAnswers = async (id) => {
        try {
            const { data } = await axios.get(`${SERVER_URL}/question-answers/${id}`);
            return data.answers;
        } catch (err) {
            throw err;
        }
    };

    const answerQuestion = async (form) => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${profile?.token}` } };
            const { data } = await axios.post(`${SERVER_URL}/answer-question`, form, config);
            return data.answer;
        } catch (err) {
            throw err;
        }
    };

    const voteAnswer = async (id) => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${profile?.token}` } };
            await axios.patch(`${SERVER_URL}/vote/${id}`, {}, config);
            setProfile(prev => ({ ...prev, votedAnswers: [...prev.votedAnswers, id] }));
        } catch (err) {
            throw err;
        }
    };

    const unvoteAnswer = async (id) => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${profile?.token}` } };
            await axios.patch(`${SERVER_URL}/unvote/${id}`, {}, config);
            setProfile(prev => ({ ...prev, votedAnswers: prev.votedAnswers.filter(e => e !== id) }));
        } catch (err) {
            throw err;
        }
    };

    const getUserDetails = async (id) => {
        try {
            const { data } = await axios.get(`${SERVER_URL}/auth/user/${id}`);
            return data.user;
        } catch (err) {
            throw err;
        }
    };

    const userQuestions = async (id) => {
        try {
            const { data } = await axios.get(`${SERVER_URL}/user-questions/${id}`);
            return data.questions;
        } catch (err) {
            throw err;
        }
    }

    const followUser = async (id) => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${profile?.token}` } };
            await axios.patch(`${SERVER_URL}/auth/follow/${id}`, {}, config);
            setProfile(prev => ({ ...prev, following: [...prev.following, id] }));
        } catch (err) {
            throw err;
        }
    };

    const unfollowUser = async (id) => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${profile?.token}` } };
            await axios.patch(`${SERVER_URL}/auth/unfollow/${id}`, {}, config);
            setProfile(prev => ({ ...prev, following: prev.following.filter(e => e !== id) }));
        } catch (err) {
            throw err;
        }
    };

    const search = async (inp) => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${profile?.token}` } };
            const { data } = await axios.get(`${SERVER_URL}/search/${inp}`, config);
            return data.questions;
        } catch (err) {
            throw err;
        }
    }

    const value = {
        answerQuestion,
        askQuestion,
        chatState,
        dispatch,
        fields,
        firebaseHandleChatSelect,
        firebaseUsers,
        followUser,
        getFields,
        getFirebaseUsers,
        getSimilarQuestions,
        getTopQuestions,
        getUserDetails,
        questionAnswers,
        search,
        singleQuestion,
        unfollowUser,
        unvoteAnswer,
        userQuestions,
        voteAnswer,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
};

export default AppContextProvider;
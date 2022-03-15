import React, { createContext, useEffect, useState } from 'react';
import { FeedbackItemType, FeedbackListType } from '../../App';

interface ContextType {
    isLoading: boolean,
    feedback: FeedbackListType;
    feedbackEdit: FeedbackEditType,
    deleteFeedback: (id: number) => void,
    addFeedback: (newFeedback: FeedbackItemType) => Promise<void>
    editFeedback: (item: FeedbackItemType) => void;
    updateFeedback: (id: number, item: FeedbackItemType) => void;
}

interface FeedbackEditType {
    item: FeedbackItemType;
    edit: boolean;
}

const URL = 'http://localhost:5000/feedback';

const initalItem = {
    id: 1,
    rating: 10,
    text: 'This is test'
}

const initialValue = [initalItem]

const initalEdit = {
    item: initalItem,
    edit: false,
}

const intialContext = {
    isLoading: true,
    feedback: initialValue,
    feedbackEdit: initalEdit,
    deleteFeedback: () => {},
    addFeedback: async () => { await fetch('/feedback')},
    editFeedback: () => {},
    updateFeedback: () => {},
}


const FeedbackContext = createContext<ContextType>(intialContext);

export const FeedbackProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState<FeedbackListType>(initialValue);
    const [feedbackEdit, setFeedbackEdit] = useState<FeedbackEditType>(initalEdit);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const response = await fetch(`${URL}?_sort=id`);
        const data = await response.json();
        setFeedback(data)
        setIsLoading(false)
    }
    

    const deleteFeedback = async (id: number): Promise<void> => {
        await fetch(`${URL}/${id}`, {
            method: 'DELETE'
        })

        setFeedback(() => feedback.filter(item => item.id !== id))
    }

    const addFeedback = async (newFeedback: FeedbackItemType): Promise<void> => {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })
        console.log(newFeedback)
        const data = await response.json();

        setFeedback(() => [data, ...feedback])
    }

    const updateFeedback = async (id: number, updateItem: FeedbackItemType): Promise<void> => {
        const response = await fetch(`${URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateItem)
        })

        const data = await response.json();
        setFeedback(() => feedback.map(item => item.id === id ? {...item, ...data} : item));
        setFeedbackEdit({
            item: updateItem,
            edit: false
        })
    }

    const editFeedback = (item: FeedbackItemType) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    return <FeedbackContext.Provider value={{
        isLoading,
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
    }}>{ children }</FeedbackContext.Provider>
}

export default FeedbackContext;
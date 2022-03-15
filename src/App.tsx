
import './index.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FeedbackProvider } from './components/context/FeedbackContext';

import Header from './components/Header/Header';
import FeedbackList from './components/FeedbackList/FeedbackList';
import FeedbackStats from './components/FeedbackStats/FeedbackStats';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import About from './components/About/About';
import AboutIconButton from './components/shared/AboutIconButton/AboutIconButton';


export interface FeedbackItemType {
    id: number;
    rating: number;
    text: string;
}

export type FeedbackListType = FeedbackItemType[]

function App() {
    return (
        <FeedbackProvider>
            <Router>
                <Header text='Feedback UI'/>
                <div className="container">
                <Routes>
                    <Route path='/' element={
                        <>
                            <FeedbackForm />
                            <FeedbackStats />
                            <FeedbackList />
                            <AboutIconButton />
                        </>
                        } />
                    <Route path='/about' element={<About />} />
                </Routes>
                </div>
            </Router>
        </FeedbackProvider>
    )
}

export default App
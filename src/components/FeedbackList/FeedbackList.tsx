import FeedBackItem from '../FeedbackItem/FeedBackItem'
import FeedbackContext from '../context/FeedbackContext';

import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import Spiner from '../shared/Spiner/Spiner';


function FeedbackList() {
  const { feedback, isLoading } = useContext(FeedbackContext)

  if (!isLoading && (!feedback || feedback.length < 1)) {
    return (
      <p>Feedbacks not yet</p> 
    )
  }
  
  return isLoading ? <Spiner />
      : (
        <ul>
          <AnimatePresence>
            {feedback.map((feedbackItem) => (
              <motion.li 
                key={feedbackItem.id}
                initial={{ opacity: 0, scale: .5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: .5 }}
              >
                <FeedBackItem feedback={feedbackItem} />
              </motion.li>
            ))}
            </AnimatePresence>
        </ul>
      )
}

export default FeedbackList
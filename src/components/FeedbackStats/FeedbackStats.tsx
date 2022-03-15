
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';


function FeedbackStats() {
    const { feedback } = useContext(FeedbackContext)
    const averageFloat = feedback.reduce((acc, cur) => {
        return acc + cur.rating
    }, 0) / feedback.length;

    const averageToFixed = averageFloat.toFixed(1);

    const average = averageToFixed.replace(/[.,]0$/, '');

  return (
    <div className='feedback-stats'>
        <h4>{feedback.length} Review</h4>
        <h4>Average Rating {average === 'NaN' ? 0 : average}</h4>
    </div>
  )
}

export default FeedbackStats;
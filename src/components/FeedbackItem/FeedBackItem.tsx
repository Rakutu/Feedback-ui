import Card from '../shared/Card/Card';
import FeedbackContext from '../context/FeedbackContext';

import { FeedbackItemType } from '../../App';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { useContext } from 'react';

interface FeedBackItemPropTypes {
  feedback: FeedbackItemType;
}

function FeedBackItem({ feedback }: FeedBackItemPropTypes) {
  const { rating, text, id } = feedback;
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);

  return (
    <Card>
      <div className="num-display">{rating}</div>
      <button className='close' onClick={() => deleteFeedback(id)}>
        <FaTimes color='#ff6a95'/>
      </button>
      <button className='edit' onClick={() => editFeedback(feedback)}>
        <FaEdit color='#ff6a95'/>
      </button>
      <p className="text-display">{text}</p>
    </Card>
  )
}

export default FeedBackItem

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import FeedbackContext from '../context/FeedbackContext';
import FeedbackRating from '../FeedbackRating/FeedbackRating';
import Button from '../shared/Button/Button'
import Card from '../shared/Card/Card'

function FeedbackForm() {
  const [value, setValue] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [rating, setRating] = useState(10);

  const { addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

  useEffect(() => {
    const { edit, item } = feedbackEdit;

    if (edit === true) {
      setBtnDisabled(false);
      setValue(item.text);
      setRating(item.rating)
    }
  }, [feedbackEdit])

  const handleChage = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(() => event.target.value)
  }

  useEffect(() => {
    updateStates(value)
  }, [value])
  
  
  const updateStates = (value: string) => {
    if (value === '') {
      setBtnDisabled(true);
      setErrorMessage('');
    } else if (value !== '' && value.trim().length <= 10) {
      setBtnDisabled(true);
      setErrorMessage('Text must be at least 10 characters');
    } else {
      setBtnDisabled(false);
      setErrorMessage('')
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { edit, item } = feedbackEdit;

    const newFeedback = {
      rating,
      text: value,
      id: edit ? item.id : Date.now(),
    }

    if (edit === true) {
      updateFeedback(item.id, {...newFeedback })
    } else (
      addFeedback(newFeedback)
    )
    setValue('');
    setRating(0)
  }
  
  
  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service with us?</h2>
            <FeedbackRating select={setRating} selected={rating} />
            <div className="input-group">
                <input type="text" placeholder='Write a review' value={value} onChange={handleChage}/> 
                <Button version='secondary' type='submit' isDisabled={btnDisabled}>Send</Button>
            </div>
            {errorMessage && <p className='message'>{errorMessage}</p>}
        </form>
    </Card>
  )
}

export default FeedbackForm
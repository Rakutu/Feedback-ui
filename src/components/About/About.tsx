import Button from '../shared/Button/Button'
import Card from '../shared/Card/Card'
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="container">
        <Card>
            <h1>About this project</h1>
            <p>This is my practice project It is a small and preasant-looking force for collecting feedback</p>
            <h2>Technology stack</h2>
            <ol className='list'>
                <li>Create react app</li>
                <li>Typescript</li>
                <li>Framer-motion</li>
                <li>React router</li>
                <li>JSON server</li>
            </ol>
            <Link to='/'>
                <Button>Back to Home</Button>
            </Link>
        </Card>
    </div>
  )
}

export default About
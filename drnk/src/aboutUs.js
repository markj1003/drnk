import React from 'react';
import Button from 'react-bootstrap/Button';
import Beer from './assets/beerLogo';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';
import Ruaridh from './assets/aboutPhotos/ruaridh.jpg';
import Enner from './assets/aboutPhotos/enner.jpg';
import Mark from './assets/aboutPhotos/mark.jpg';
import Lang from './assets/aboutPhotos/lang.jpg';
import Ella from './assets/aboutPhotos/ella.jpg';
import Joyal from './assets/aboutPhotos/joyal.jpg';
import './aboutUs.css';


function People(props) {
    return (<div className='row'>
                {props.people.map((person)=>(
                    <div className="col-lg-4 text-center" key={person.name}>
                        <Image src={person.picture} className='profile' fluid thumbnail roundedCircle />
                        <h2 className="fw-normal text-primary">{person.name}</h2>
                        <strong>{person.title}</strong>
                        <p>{person.description}</p>
                    </div>))}
            </div>  )
}

export default function AboutUs() {
    const people = [
        {
            name: 'Ruaridh Bell',
            title: 'Back end wizard', 
            picture: Ruaridh,
            description: 'The main reason you can see this site right now.'
        },
        {
            name: 'William Ennis',
            title: 'Props lead',
            picture: Enner,
            description: "You'll know all about it once he gets involved."
        },
        {
            name: 'Mark Jennings',
            title: 'Front end monkey',
            picture: Mark,
            description: 'Garbage in, garbage out.'
        },
        {
            name: 'Liam Lang',
            title: 'Project manager',
            picture: Lang,
            description: 'If you do this job right, people will wonder if you really did anything at all.'
        },
        {
            name: "Ella O'Broin",
            title: 'Solutions architect',
            picture: Ella,
            description: "The project manager's manager."
        },
        {
            name: 'Joyal Raju',
            title: 'Front end monkey',
            picture: Joyal,
            description: 'Making his dreams a reality.'
        }

    ]
    const navigate = useNavigate();
    return (
        <div className="container marketing">
            <div className='row justify-content-center'>
                <div className='col-lg-6 text-center'>
                    <h1 className='text-primary'>About us</h1>
                    <Beer size='about'/>
                    <p>Driven by a shared passion for the drink we strive to create a boozier internet, one game at a time.</p>
                    <div className='d-flex justify-content-center'>
                        <Button onClick={() => navigate('/auth/signUp')}>Get involved</Button>
                    </div>
                </div>
            </div>
            <hr />
            <div className='row justify-content-center pb-3'>
                <div className='col text-center'>
                    <h3 className='text-primary'>Meet the team</h3>
                </div>
            </div>
            <People people={people} />
        </div>
    )
}
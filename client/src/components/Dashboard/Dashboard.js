import React from 'react'
import Navbar from '../Navbar/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'

export default function Dashboard() {
    return (
        <div>
            <Navbar />

            <Container>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col xs="12" md="4">
                                <Image src="https://i.pinimg.com/originals/1d/da/7b/1dda7b4e6b8298cbd99a70b1cccd2c34.jpg" fluid />
                            </Col>
                            <Col xs="12" md="6">
                                <p>
                                    Iron Man is a superhero who wears a suit of armor. His alter ego is Tony Stark.
                                    He was created by Stan Lee, Jack Kirby and Larry Lieber for Marvel Comics in Tales of Suspense #39 in the year 1963 and appears in their comic books.
                                    He is also one of the main protagonists in the Marvel Cinematic Universe.
                                </p>

                                <p>
                                    In the movies and the earlier comic books, Tony Stark is just a human.
                                    Outside the suit, he does not have any superpowers. He made the suit himself, and nobody else can usually control it.
                                    Iron Man can fly and shoot beams from his hands using special technology called "repulsors" in his boots and gloves.
                                    He is not hurt by most weapons like guns and cannons.
                                    There are many versions of the Iron Man suit, because Stark keeps making improvements.

                                    In the later comic books, Stark took an experimental virus called "STD" which allowed him to control his suit with his mind and summon it wherever he was.
                                    Stark would eventually develop an armor that he could store in his body. This armor was known as the "Bleeding Edge Model 37".
                                </p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

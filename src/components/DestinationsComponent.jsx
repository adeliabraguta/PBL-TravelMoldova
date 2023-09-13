import React, {useEffect, useState} from "react";
import {Home, Line, Banner , Title , Desc} from '../Styles/Banner.js'
import DestinationComponent from "./DestinationComponent.jsx";
import styled from "styled-components";
export default function DestinationsComponent(){
    const [destinations, setDestinations] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:3000/destinations')
            const data = await res.json();
            setDestinations(data);
        }
        fetchData()
            .catch(console.error)

    },[])
    return(
        <Home>
            <Line>
                <Banner>
                    <Desc >
                        TRAVEL NOW
                    </Desc>
                    <Title >
                        Moldova's Popular Destinations
                    </Title>
                </Banner>
            </Line>
            <List>
                {destinations.map(destination => (
                    <DestinationComponent key={destination.id} destination={destination}/>
                ))}
            </List>
        </Home>
    )
}
const List= styled.div`
    padding: 24px 96px 96px 96px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 64px;
    transition-property: box-shadow, transform;
    transition: 0.3s ease;
    will-change: box-shadow, transform;

`
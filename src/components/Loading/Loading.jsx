import React from 'react'
import styled from 'styled-components';
import "./loading.css"

const Loading = () => {
    return (
        <Container> 
            <div className="circulo">
                <div className="circulo1 circulo-hijo"></div>
                <div className="circulo2 circulo-hijo"></div>
                <div className="circulo3 circulo-hijo"></div>
                <div className="circulo4 circulo-hijo"></div>
                <div className="circulo5 circulo-hijo"></div>
                <div className="circulo6 circulo-hijo"></div>
                <div className="circulo7 circulo-hijo"></div>
                <div className="circulo8 circulo-hijo"></div>
                <div className="circulo9 circulo-hijo"></div>
                <div className="circulo10 circulo-hijo"></div>
                <div className="circulo11 circulo-hijo"></div>
                <div className="circulo12 circulo-hijo"></div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    background-color: #fff;
    width: 100%;
    height: 100%;
`

export default Loading;
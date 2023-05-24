import * as React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

export const HeroPage = () => {
    let { nickname } = useParams()
    return (
        <>
            {nickname}
        </>
    )
}
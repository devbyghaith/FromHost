import React from 'react';
import { MoonLoader } from 'react-spinners';

export default function Loading() {
    return (
        <div style={{
            display: "flex",
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            left: "0%",
            top: "0%",
        }}>
            <MoonLoader color={'var(--colors-main)'} />
            <div style={{
                transform: "translateX(calc(-100% - 1.3rem))",
                backgroundImage: 'url("/logo192.png")',
                backgroundSize: "cover",
                borderRadius: "50%",
                padding: "1.5rem",
            }} />
        </div>
    );
};
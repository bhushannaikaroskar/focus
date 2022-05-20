import React from "react";

export default function Greeting({name}) {

    const greetingMessage = (name)=>{
        const hours = new Date().getHours();
        if(hours<5){
            return `Good night, ${name}`
        }else if(hours<12){
            return `Good morning, ${name}`
        }else if(hours<17){
            return `Good afternoon, ${name}`
        }else if(hours<22){
            return `Good evening, ${name}`
        }else{
            return `Good night, ${name}`
        }
    }

    return <div className="welcome-message">{greetingMessage(name)}</div>;
}

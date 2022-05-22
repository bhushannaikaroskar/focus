import React, { useState } from 'react'
import { quotes } from '../../data/quotes'
import "./randomQuote.css"

export default function RandomQuote() {

  const [quoteObj,setQuoteObj] = useState(quotes[Math.floor(Math.random()*(quotes.length-1))])

  return (
    <div className='quote-container'>
        <div className="quote-message">{quoteObj.quoteText}</div>
        <div className="quote-author">{quoteObj.quoteAuthor}</div>
    </div>
  )
}

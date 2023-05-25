import React from 'react'

const Suggestions = ({ suggestions }) => {
    // TODO turn this component into one that makes each suggestion its own pill

    const lineBreaks = suggestions.split(/[-?]/).map((line, index) => (<p key={index}>{line}</p>))
  return (
    <div>
      
      {lineBreaks}
    </div>
  );
}

export default Suggestions
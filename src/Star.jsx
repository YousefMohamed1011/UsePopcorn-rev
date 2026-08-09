import { useState } from 'react'
const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
}

const Star = () => {
    const [rating, setRating] = useState(0)
    function handleRate(newRating) {
        setRating(newRating)
    }
    return (
        <>
            <div style={containerStyle}>{Array.from({ length: 10 }, (_, i) => {
                return (
                    <>
                        <StarIcon onRate={() => handleRate(i + 1)} fill={rating > i} />
                    </>
                )
            })}
            </div >
            <div >
                <span>{rating}</span>
            </div>
        </>

    )
}


function StarIcon({ onRate, fill  }) {
    return (
        <div onClick={onRate} style={{
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        }}>
            {fill ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-1 h-1">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.960 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.290-1.960-1.425l1.257-5.273-4.117-3.527c-.887-.760-.415-2.212.749-2.305l5.404-.433L10.788 3.21z" clipRule="evenodd" />
            </svg>
                : <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="#000"
                    stroke="#000"
                >
                    <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                </svg>}
        </div>

    )
}

export default Star
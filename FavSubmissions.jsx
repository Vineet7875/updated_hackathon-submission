import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Submissions.css';

function FavSubmissions({favsubmissions,searchQuery,sortBy}) {
    const navigate = useNavigate();
    const [selectedCardId, setSelectedCardId] = useState(null);
    
    const sortedSubmissions =
        sortBy === 'newest'
            ? [...favsubmissions].sort((a, b) => b.id - a.id)
            : [...favsubmissions].sort((a, b) => a.id - b.id);
    const filteredSubmissions = sortedSubmissions.filter((submission) =>
        submission.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleClick2 = (submission) => {
        setSelectedCardId(submission.id);
        navigate(`/FavDescription/${submission.id}`, {
            state: {
                submission: submission,
                id: submission.id,
                title: submission.title,
                summary: submission.summary,
                description: submission.description,
                img: submission.img,
                startdate: submission.startdate,
                enddate: submission.enddate,
                gitlink: submission.gitlink,
                linklink: submission.linklink,
            },
        });
    };

    return (
        <div className='container'>
            <div className="card-list">
                {filteredSubmissions.map((submission) => (
                    <div key={submission.id} className="card" onClick={() => handleClick2(submission)}>
                        <div className="card-image">
                            <img src={submission.img.preview} alt={submission.title} />
                        </div>
                        <div className="card-content">
                            <div className="card-title">{submission.title}</div>
                            <div className="card-desc">{submission.summary}</div>
                        </div>
                        <div className="card-modify">uploaded just now</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavSubmissions;

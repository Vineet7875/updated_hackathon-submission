import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import './Submissions.css';

function Submissions({submissions, favsubmissions, searchQuery, sortBy}) {
  const navigate = useNavigate();
  const [selectedCardId, setSelectedCardId] = useState(null);

  const filteredSubmissions = (submissions || favsubmissions).filter((submission) =>
    submission.title.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  const sortedSubmissions =
    sortBy === 'newest'
      ? [...filteredSubmissions].sort((a, b) => b.id - a.id)
      : [...filteredSubmissions].sort((a, b) => a.id - b.id);

  const handleClick = (submission) => {
    setSelectedCardId(submission.id);
    navigate(`/Description/${submission.id}`, {
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
        linklink: submission.linklink
      }
    });
  };

  return (
    <div className='container'>
      <div className="card-list">
      
        {sortedSubmissions.map((submission) => (
          <div key={submission.id} className="card" onClick={() => handleClick(submission)} >
            <div className="card-image">
              <img src={submission.img.preview} alt={submission.title} />
            </div>
            <div className="card-content">
              <div className="card-title">{submission.title}</div>
              <div className="card-desc">{submission.summary}</div>
            </div>
            <div className="card-modify">uploaded  just now</div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Submissions;







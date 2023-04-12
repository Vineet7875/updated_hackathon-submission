import React, { useState } from 'react';
import './Description.css';
import { StarBorder, Star, Description } from '@material-ui/icons';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useNavigate, useLocation } from 'react-router-dom';
import { GitHub as GithubIcon, Link as LinkIcon } from '@material-ui/icons';

function FavDescription({ setFavsubmissions, favsubmissions }) {
    const location = useLocation();
    const { submission, id, title, summary, img, startdate, enddate, gitlink, linklink, description } = location.state;
    const navigate = useNavigate();

    const [filled, setFilled] = useState(false);

    const styles = {
        button: {
            margin: '8px',
            textTransform: 'none',
            backgroundColor: 'transparent',
            fontSize: '16px',
            border: '1px solid white',
            borderRadius: '10px',
            width: '10rem',
            height: '3.5rem'
        },
        button1: {
            backgroundColor: 'transparent',
            border: '1px solid black',
            borderRadius: '8px',
            padding: '7px 15px',
            textTransform: 'none',
            fontSize: '1rem',
            width: '15rem',
            height: '3.5rem'
        },
        icon: {
            marginRight: '8px'
        },
    };

    const PencilButton = ({ onClick }) => (
        <Button
            variant="contained"
            color="primary"
            style={styles.button}
            onClick={onClick}
            startIcon={<EditIcon style={styles.icon} />}
        >
            Edit
        </Button>
    );

    const DeleteButton = ({ onClick }) => (
        <Button
            variant="contained"
            color="secondary"
            style={styles.button}
            onClick={onClick}
            startIcon={<DeleteIcon style={styles.icon} />}
        >
            Delete
        </Button>
    );
    const GithubButton = ({ gitlink }) => {
        const handleClick = () => {
            window.open(gitlink, "_blank");
        };
        return (
            <Button
                variant="outlined"
                color="default"
                style={styles.button1}
                startIcon={<GithubIcon style={styles.icon} />}
                onClick={handleClick}
            >
                GitHub Repository
            </Button>
        );
    };

    const LinkButton = ({ linklink }) => {
        const handleClick = () => {
            window.open(linklink, "_blank");
        };
        return (
            <Button
                variant="outlined"
                color="default"
                style={styles.button1}
                startIcon={<LinkIcon style={styles.icon} />}
                onClick={handleClick}
            >
                Other Link
            </Button>
        );
    };
    const handleEditClick = (submission, submissionID) => {

        navigate("/Editsubmission", { state: { submission } });
    };

    const handleDeleteClick = (submission, submissionID) => {
        const confirmed = window.confirm("This action is irreversible. Are you sure want to delete this model?");
        if (confirmed) {
            console.log("delete fav sub");
            setFavsubmissions(submissions => submissions.filter(sub => sub.id !== submission.id));
            navigate("/FavSubmissions");
        }
    };


    const handleFavClick = (submission) => {
        setFilled(!filled);
        const isAlreadyFav = favsubmissions.some((favSubmission) => favSubmission.id === submission.id);
        if (!isAlreadyFav) {
            setFavsubmissions([...favsubmissions, { id: favsubmissions.length + 1, ...submission }]);
        }
    };


    return (
        <>

            <div className='main-container' id={id}>

                <div className='desc-container'>
                    <div className='desc-card1'>
                        <div className='img-title'>
                            <img src={img.preview} />
                            <h2>{title}</h2>
                        </div>
                        <div className='desc-para'>
                            <p>{summary}</p>
                        </div>
                        <div className='star-date'>
                            <div onClick={() => handleFavClick(submission, id)}>
                                {filled ? <Star style={{ fontSize: '20px' }} /> : <StarBorder style={{ fontSize: '20px' }} />}
                            </div>
                            <div className='date'>
                                <CalendarTodayIcon style={{ paddingTop: '0px' }} />
                                <span style={{ marginLeft: '5px' }}>
                                    {startdate
                                        ? new Date(
                                            startdate.replace(
                                                /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/,
                                                '$2/$1/$3'
                                            )
                                        ).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short'

                                        })
                                        : ''}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='desc-card2'>
                        <PencilButton onClick={() => handleEditClick(submission, id)} />
                        <DeleteButton onClick={() => handleDeleteClick(submission, id)} />
                    </div>
                </div>
                <div className='desc2-container'>
                    <div className='desc2-card1'>
                        <h2>Description</h2>
                        <div>
                            <p>{description}</p>

                        </div>
                    </div>
                    <div className='desc2-card2'>
                        <p>Hackathon</p>
                        <h2>Prestige Interview Challenge</h2>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarTodayIcon style={{ paddingTop: '0px' }} />
                                <span style={{ marginLeft: '5px' }}>
                                    {startdate
                                        ? new Date(
                                            startdate.replace(
                                                /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/,
                                                '$2/$1/$3'
                                            )
                                        ).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })
                                        : ''}
                                </span>
                                <span> &nbsp;&nbsp;- </span>
                                <span style={{ marginLeft: '5px' }}>
                                    {enddate
                                        ? new Date(
                                            enddate.replace(
                                                /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/,
                                                '$2/$1/$3'
                                            )
                                        ).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })
                                        : ''}
                                </span>

                            </div>
                        </div>

                        <div className='buttons'>

                            <GithubButton gitlink={gitlink} />

                            <LinkButton linklink={linklink} />
                        </div>
                    </div>

                </div>

            </div>

        </>
    );
}

export default FavDescription;

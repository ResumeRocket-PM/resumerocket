import SectionEditButton from './SectionEditButton';

const EducationEntry = ({schoolName, degree, major, minor, graduationDate, courses, onEditClick}) => {
    return (
        <>
            <div className='hz-space-btwn'>
                <h3>{schoolName}</h3>
                <SectionEditButton onClick={onEditClick}/>
            </div>        
            <div className='account-page-education-entry v-center'>
                <p>{degree} in {major} {minor && `with a minor in ${minor}`}</p>
                <p>Graduated {graduationDate}</p>
                {courses &&
                    <ul>
                        {courses.map((course, index) => (
                            <li key={index}>{course}</li>
                        ))}
                    </ul>
                }
            </div>        
        </>
    );
};

export default EducationEntry;
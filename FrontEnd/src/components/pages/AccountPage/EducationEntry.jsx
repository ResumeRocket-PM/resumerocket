import SectionEditButton from './SectionEditButton';

const EducationEntry = ({ schoolName, degree, major, minor, graduationDate, courses, onEditClick }) => {

    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date.getTime());
    };

    const parseDate = (dateString) => {
        const date = new Date(dateString);
        return isValidDate(date) ? date : null;
    };

    const formatDate = (date) => {
        if (!isValidDate(date)) {
            return ''; // Or any default value or error message you prefer
        }
        const options = { month: '2-digit', year: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    const displayGraduationDate = graduationDate 
    ? `Graduated: ${formatDate(parseDate(graduationDate))}` 
    : 'Currently Enrolled';

    return (
        <>
            <div className='hz-space-btwn'>

                <h3 style={{ display: 'inline-flex', justifyContent: 'space-between', width: '100%', padding: '0'}}> 
                    <span>{schoolName}</span>
                </h3>

                {onEditClick && <SectionEditButton onClick={onEditClick} />}
                
            </div>
            <div className='account-page-education-entry v-center'>
                {degree} • {displayGraduationDate}

                <p>
                    {major} {minor ? `with a minor in ${minor}` : ''}
                </p>
            </div>
        </>
    );
};

export default EducationEntry;

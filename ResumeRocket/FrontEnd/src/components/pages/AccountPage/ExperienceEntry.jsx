import SectionEditButton from './SectionEditButton';

const ExperienceEntry = ({ company, position, type, description, startDate, endDate, onEditClick }) => {
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

    // Check if endDate is valid; if not, display 'Present'
    const displayEndDate = endDate ? formatDate(parseDate(endDate)) : 'Present';

    return (
        <>
            <div className='hz-space-btwn'>
                <h3 style={{ display: 'inline-flex', justifyContent: 'space-between', width: '100%', paddingRight: '4em'}}> 
                    <span>
                        {position}, <span style={{ fontStyle: 'italic', fontSize: '0.9em' }}>{company}</span>
                    </span>
                    <span>
                        {`${formatDate(parseDate(startDate))} - ${displayEndDate}`}
                    </span>
                </h3>
                <SectionEditButton onClick={onEditClick} />
            </div>
            <div className='account-page-experience-entry v-center'>
                <p style={{ textIndent: '1em' }}>
                    <strong>{type}</strong> - {description}
                </p>
            </div>
        </>
    );
};

export default ExperienceEntry;

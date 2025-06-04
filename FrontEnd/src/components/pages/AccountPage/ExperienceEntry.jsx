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
        <div className='account-page-experience'>
            <div className='hz-space-btwn'>
                <h3 style={{ display: 'inline-flex', justifyContent: 'space-between', width: '100%', padding: '0'}}> 
                    <span>
                        {position}
                    </span>
                </h3>
                {onEditClick && <SectionEditButton onClick={onEditClick} />}
            </div>

            <div className="v-center">
                <h4 style={{ color: '#888', fontWeight: '400', display: 'inline' }}>{company} • {type}</h4>
                <h4 style={{ color: '#888', fontWeight: '400', display: 'inline' }}>
                    {`${formatDate(parseDate(startDate))} - ${displayEndDate}`}
                </h4>
            </div>

            <div className='account-page-experience-description v-center'>
                <p>
                    {
                        description
                            .split('\n')
                            .map((line, idx) => (
                                <div key={idx}>
                                    {line}
                                    {idx < description.split('\n').length - 1 && <br />}
                                </div>
                            ))
                    }
                </p>
            </div>
        </div>
    );
};

export default ExperienceEntry;

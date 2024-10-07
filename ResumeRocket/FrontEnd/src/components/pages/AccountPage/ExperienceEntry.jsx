import SectionEditButton from './SectionEditButton';

const ExperienceEntry = ({company, position, type, description, startDate, endDate, onEditClick}) => {    

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

    return (
        <>
            <div className='hz-space-btwn'>
                <h3>{company}</h3>
                <SectionEditButton onClick={onEditClick}/>
            </div>
            <div className='account-page-experience-entry v-center'>
                <p>{position}</p>
                <p>{type}</p>
                <p>{formatDate(parseDate(startDate))} - {formatDate(parseDate(endDate))}</p>
                <p>{description}</p>
            </div>        
        </>
    );
};


export default ExperienceEntry;
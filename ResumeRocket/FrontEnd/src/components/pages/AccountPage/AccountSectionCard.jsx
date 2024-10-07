import SectionAddButton from './SectionAddButton'; 
import SectionEditButton from './SectionEditButton';

const AccountSectionCard = ({title, children, buttonType, onButtonClick}) => {
    return (
        <div id={`account-page-${title}-section`} className='account-page-section-card'>
        <div className='account-page-section-header hz-space-btwn'>
            <h2>{title}</h2>
            <div className='account-page-section-modify hz-center'>
                {buttonType === 'add' && <SectionAddButton onClick={onButtonClick} />}
                {buttonType === 'edit' && <SectionEditButton onClick={onButtonClick} />}
            </div>
        </div>
        <div className='account-page-section-content'>
            {children}
        </div>
    </div>
    );
};

export default AccountSectionCard;
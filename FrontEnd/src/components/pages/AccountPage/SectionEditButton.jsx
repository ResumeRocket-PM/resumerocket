import editIcon from "../../../assets/pen-to-square-solid.svg";

const SectionEditButton = ({onClick, }) => {
    return (
        <div className='account-page-section-modify-button hz-center' onClick={onClick}>
            <img src={editIcon} />
        </div>
    );
};

export default SectionEditButton;
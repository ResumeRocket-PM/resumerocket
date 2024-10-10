import editIcon from "../../../assets/pen-to-square-solid.svg";

const SectionEditButton = ({onClick, }) => {
    return (
        <div className='account-page-section-modify-button hz-center'>
            <img src={editIcon} onClick={onClick}/>
        </div>
    );
};

export default SectionEditButton;
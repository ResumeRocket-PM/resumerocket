import addIcon from "../../../assets/plus-solid.svg";

const SectionAddButton = ({onClick}) => {
    return (
        <div className='account-page-section-modify-button hz-center'>
            <img src={addIcon} onClick={onClick}/>
        </div>
    );
};

export default SectionAddButton;
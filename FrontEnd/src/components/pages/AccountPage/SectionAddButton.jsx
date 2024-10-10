import addIcon from "../../../assets/plus-solid.svg";

const SectionAddButton = ({onClick}) => {
    return (
        <div className='account-page-section-modify-button hz-center' onClick={onClick}>
            <img src={addIcon} />
        </div>
    );
};

export default SectionAddButton;
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import ProjectSectionWrapper from "../ProjectSectionWrapper";
import KermitPic from '../../../assets/kermit-profile-pic.jpg';
import { useRef, useEffect } from 'react';


const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
};

// const CarouselLayoutContainer = styled.div`
//     .slick-track {
//         display: flex;
//         align-items: stretch;
//     }
//     .slick-slide {
//         display: flex;
//         align-self: stretch;
//         height: unset;
//         > div {
//             display: flex;
//             align-self: stretch;
//             width: 100%;
//         }
//     }
// `;

const ProjectGallery = ({ project, setProject, content, sectionIndex }) => {
    const settings = {
        dots: true,
        infinite: true,
        centerMode: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        afterChange: (current) => handleAfterChange(current)
      };

    const sliderRef = useRef(null);

    const handleAfterChange = (current) => {
        const slides = sliderRef.current.innerSlider.list.querySelectorAll('.slick-slide');
        slides.forEach((slide, index) => {
            slide.classList.remove('prev-slide', 'next-slide', 'prev-prev-slide', 'next-next-slide');
            if (index === current - 1) {
                slide.classList.add('prev-slide');
            } else if (index === current + 1) {
                slide.classList.add('next-slide');
            } else if (index === current - 2) {
                slide.classList.add('prev-prev-slide');
            } else if (index === current + 2) {
                slide.classList.add('next-next-slide');
            }
        });
    };

    useEffect(() => {
        handleAfterChange(0); // Initialize classes on first render
    }, []);

    return (
        <ProjectSectionWrapper project={project} setProject={setProject} sectionIndex={sectionIndex}>
            <div 
                className="slider-container"
                style={{ 
                    width: '75%', 
                    // position: 'relative', 
                    backgroundColor: 'black'
                }}
            >
                <Slider ref={sliderRef} {...settings}>
                    <div>
                        <h3 className='carousel-item'>1</h3>
                    </div>
                    <div>
                        <h3 className='carousel-item'>2</h3>
                    </div>
                    <div>
                        <h3 className='carousel-item'>3</h3>
                    </div>
                    <div>
                        <h3 className='carousel-item'>4</h3>
                    </div>
                    <div>
                        <h3 className='carousel-item'>5</h3>
                    </div>
                    <div>
                        <h3 className='carousel-item'>6</h3>
                    </div>
                    <div>
                        <h3 className='carousel-item'>7</h3>
                    </div>
                    <div>
                        <h3 className='carousel-item'>8</h3>
                    </div>
                    <div>
                        <h3 className='carousel-item'>9</h3>
                    </div>               
                </Slider>
            </div>
        </ProjectSectionWrapper>
    );
};

export default ProjectGallery;
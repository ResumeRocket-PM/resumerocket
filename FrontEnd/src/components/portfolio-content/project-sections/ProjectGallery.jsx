import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import ProjectSectionWrapper from "../ProjectSectionWrapper";
import KermitPic from '../../../assets/kermit-profile-pic.jpg';
import { useRef, useEffect, useState, useContext } from 'react';
import appImg1 from '../../../assets/stock-images/app_image_1.jpg';
import appImg2 from '../../../assets/stock-images/app_image_2.jpg';
import appImg3 from '../../../assets/stock-images/app_image_3.jpg';
import PortfolioItemWithPopupWrapper from '../PortfolioItemWithPopupWrapper';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import RearrangeImagesDialog from "../RearrangeImagesDialog";
import RearrangeImagesDialogGrid from "../RearrangeImagesDialogGrid";
import { ImageContext } from '../../../context/ImageProvider';

// const images = [
//     "https://images.ctfassets.net/rt5zmd3ipxai/5hWDLmY62kBYnc2Cm4WF2T/e2ffb09597504b9832fafdf579c80c91/NVA_-_MASTER_-_BLOG_-_EXOTIC_-_LEOPARD_GECKO.jpg?fit=fill&fm=webp&h=678&w=1252&q=72",
//     "https://cdn.medvet.com/app/uploads/2016/12/Common-diseases-leopard-gecko.jpg?strip=all&lossy=1&ssl=1",
//     "https://www.thesprucepets.com/thmb/sPIX7usm_Q2CfR51TtVlbd6hFio=/8093x0/filters:no_upscale():strip_icc()/day-geckos-as-pets-1236908-hero-eac0bb91e96548c18066fd58bbb26772.jpg",
//     "https://ottawa.citynews.ca/wp-content/blogs.dir/sites/4/2024/03/22/gecko-verdian-chua-unsplash-scaled-1024x576.jpg",
//     "https://www.sciencealert.com/images/2024/10/happy_gecko-642x260.jpg",
//     "https://news.uga.edu/wp-content/uploads/2017/12/UGA-BlueGecko-960.jpg",
// ];

const images = [
    appImg1,
    appImg2,
    appImg3,
    appImg1,
    appImg2,
    appImg3,
];


const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
};

const ProjectGallery = ({ project, setProject, content, sectionIndex }) => {

    const { showImage } = useContext(ImageContext);
    const sliderRef = useRef(null);
    const [rearrangeDialogOpen, setRearrangeDialogOpen] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        if (content?.images[0]?.imageUrl) {
            const fetchImageUrls = async () => {
                const urls = [];
                for (let i = 0; i < content.images.length; i++) {
                    const image = content.images[i];
                    if (image.imageUrl && image.imageId) {
                        let url = await showImage(image.imageUrl, image.imageId);
                        url = URL.createObjectURL(url);
                        urls[i] = url;
                    }else {
                        urls[i] = image.imageUrl;
                    }
                }
                setImageUrls(urls);
            };

            fetchImageUrls();
        }
    }, [content]);
            

    // const handleAfterChange = (current) => {
    //     current = current+4;
    //     const slides = sliderRef.current.innerSlider.list.querySelectorAll('.slick-slide');
    //     slides.forEach((slide, index) => {
    //         slide.classList.remove('prev-slide', 'next-slide', 'prev-prev-slide', 'next-next-slide');
    //         if (index === current - 1) {
    //             slide.classList.add('prev-slide');
    //         } else if (index === current + 1) {
    //             slide.classList.add('next-slide');
    //         } else if (index === current - 2) {
    //             slide.classList.add('prev-prev-slide');
    //         } else if (index === current + 2) {
    //             slide.classList.add('next-next-slide');
    //         }
    //     });
    // };

    // useEffect(() => {
    //     handleAfterChange(0); // Initialize classes on first render
    // }, []);

    const settings = {
        dots: true,
        infinite: true,
        centerMode: true,
        centerPadding: "80px",
        // adaptiveHeight: true,   
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        // afterChange: handleAfterChange,
    };

    const changeImages = (newImages) => {
        setProject(prevProject => {
            const updatedSections = prevProject.sections.map((section, index) => {
                if (section.type === 'gallery' && index === sectionIndex) {
                    return { ...section, content: { ...section.content, images: newImages } };
                }
                return section;
            });
            return { ...prevProject, sections: updatedSections };
        }
        );
    };

    console.log('content', content);
    console.log('imageUrls', imageUrls);


    return (
        <>
            <style>
                {`
                    .slick-prev:before,
                    .slick-next:before {
                        color: grey;
                    }
                `}
            </style>
            <div 
                className="slider-container"
                style={{ 
                    width: '75%', 
                    // backgroundColor: 'black'
                }}
            >
                <PortfolioItemWithPopupWrapper
                    popupLocation="top-right-over"
                    // useContentClick={true}
                    wrapperStyles={{width: '100%'}}
                    // childrenContainerClasses='hz-center'
                    // childrenContainerStyles={{width: '100%'}}
                    popupStyles={{marginRight: '30px'}}
                    popupContentClasses={'on-hover-background-color'}
                    popoverContent={
                        <>
                            <div className='hz-center' onClick={() => setRearrangeDialogOpen(true)}>
                                <EditIcon />
                                <p>Edit Gallery</p>
                            </div>
                            {/* <div className='hz-center' onClick={() =}>
                                <FileUploadIcon />
                                <p>Upload Images</p>
                            </div> */}
                        </>
                    }
                >
                    <Slider ref={sliderRef} {...settings} className='img-slider'>
                        {imageUrls && imageUrls.map((image, index) => (
                            <div key={index} className='carousel-item'>
                                <img 
                                    src={image} 
                                    alt={`carousel-item-${index}`} 
                                    // className='carousel-item' 
                                    // style={{ width: '150px', height: 'calc(100% - 20px)' }}
                                    style={{ width: '150px' }}

                                />
                            </div>
                        ))}
                    </Slider>
                </PortfolioItemWithPopupWrapper>
            </div> 

            {/* <RearrangeImagesDialog
                open={rearrangeDialogOpen}
                setOpen={setRearrangeDialogOpen}
                items={content?.images}
                setItems={changeImages}
            >
            </RearrangeImagesDialog> */}
            <RearrangeImagesDialogGrid
                open={rearrangeDialogOpen}
                setOpen={setRearrangeDialogOpen}
                items={content?.images}
                setItems={changeImages}
            />
       
        </>
    );
};

export default ProjectGallery;
import React from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

const TourImages = ({ tour }) => {
    const images = [tour.image, ...(tour.images || [])].map((img) => ({
        original: img,
        thumbnail: img,
    }))
    return (
        <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={true}
        />
    )
}

export default TourImages

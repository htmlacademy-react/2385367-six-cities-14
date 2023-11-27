import { Offer } from '../../types/offer';

 type GalleryOfferProps = {
   offer: Offer;
 }

function OfferPicturesGallery({offer}: GalleryOfferProps) {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {offer.images.map((item) => {
          const keyValue = `${item}`;
          return (
            <div className="offer__image-wrapper" key={keyValue}>
              <img className="offer__image" src={item} alt="Photo studio" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OfferPicturesGallery;

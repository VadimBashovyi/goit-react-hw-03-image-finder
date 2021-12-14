import styles from '../ImageGalleryItem/ImageGalleryItem.module.css'
import PropTypes from 'prop-types'

const ImageGalleryItem = ({ id, webformatURL, largeImageURL, tags }) => (
  <li key={id} className={styles.ImageGalleryItem}>
    <img
      src={webformatURL}
      alt={tags}
      data-url={largeImageURL}
      className={styles.ImageGalleryItemImage}
    />
  </li>
)

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
}

export default ImageGalleryItem

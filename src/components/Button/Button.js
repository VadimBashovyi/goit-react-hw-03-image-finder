import styles from '../Button/Button.module.css'
import PropTypes from 'prop-types'

const Button = ({ onClick }) => (
  <button className={styles.button} onClick={onClick}>
    Load more
  </button>
)

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Button

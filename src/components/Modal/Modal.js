import { Component } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import styles from '../Modal/Modal.module.css'

const modalRoot = document.querySelector('#modal-root')

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keydownEsc)
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownEsc)
  }

  keydownEsc = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose()
    }
  }

  clickBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose()
    }
  }
  onClickImgOpenModal = (e) => {
    if (e.target === e.currentTarget) {
      console.log('бекдроп')
      this.clickBackdrop()
    }
  }

  render() {
    return createPortal(
      <div className={styles.Overlay} onClick={this.clickBackdrop}>
        <div className={styles.Modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    )
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

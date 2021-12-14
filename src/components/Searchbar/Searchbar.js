import { Component } from 'react'
import styles from '../Searchbar/Searchbar.module.css'
import PropTypes from 'prop-types'
import CameraAltIcon from '@mui/icons-material/CameraAlt'

export default class Searchbar extends Component {
  state = {
    query: '',
  }

  pressChange = (e) => {
    this.setState({ query: e.target.value })
  }

  pressSubmit = (e) => {
    e.preventDefault()

    this.props.onSubmit(this.state.query)
    this.setState({ query: '' })
  }

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.pressSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <CameraAltIcon
              className={styles.icon}
              style={{ width: '100%', height: '100%', fill: 'teal' }}
            />
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images"
            value={this.state.query}
            onChange={this.pressChange}
          />
        </form>
      </header>
    )
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

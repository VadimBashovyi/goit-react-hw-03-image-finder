import styles from "./App.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Component } from "react";
import apiImages from "./services/imagesApi";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "react-loader-spinner";
import Modal from "./components/Modal";

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: "",
    isLoaded: false,
    error: null,
    showModal: false,
    LargeUrl: "",
    tag: "",
    isLastPage: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, images } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      this.fechQueryImg();
    } else {
    }
    if (images.length > 12) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  changeQuery = (query) => {
    this.setState({
      searchQuery: query,
      images: [],
      currentPage: 1,
      error: null,
    });
  };

  fechQueryImg = () => {
    const { currentPage, searchQuery } = this.state;
    const options = {
      searchQuery,
      currentPage,
    };
    this.setState({
      isLoaded: true,
    });
    apiImages
      .fetchData(options)
      .then((hits) => {
        if (hits.length === 0) {
          toast.error("Error! ");
          return;
        }
        this.setState((prevState) => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(console.error())
      .finally(() => this.setState({ isLoaded: false }));
  };
  modalToggle = () => {
    console.log("модалка");
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  clickImg = (e) => {
    console.log("Клік по карткі");
    if (e.target.nodeName !== "IMG") {
      return;
    }

    this.setState(
      {
        largeUrl: e.target.dataset.url,
        tags: e.target.alt,
      },
      this.modalToggle()
    );
  };

  render() {
    const { isLoaded, images, error, showModal, largeUrl, tag, isLastPage } =
      this.state;
    const buttonShold = images.length > 0 && !isLoaded;

    return (
      <div className={styles.container}>
        <Searchbar onSubmit={this.changeQuery} />

        <ImageGallery images={images} onClick={this.clickImg} />

        {isLoaded && (
          <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
        )}

        {!isLastPage && buttonShold && <Button onClick={this.fechQueryImg} />}

        {showModal && (
          <Modal onClose={this.modalToggle}>
            <img src={largeUrl} alt={tag} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;

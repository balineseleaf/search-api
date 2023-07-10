import { Link, useParams } from "react-router-dom";
import "./Photo.css";

const Photo = ({ photos }) => {
  const getPhotoById = (photos, id) => photos.find((photo) => photo.id === id); // для каждой фотографии сравниваем айди кликнутого конкретного фото и айди пришедшей с url

  const { id } = useParams(); //id из адресной строки  - он берется из параметров роутера (внутри App.js).
  // деструктуризируем наш айдишник.
  const photo = getPhotoById(photos, id); // фото,пришедшие с бэкенда и айдишник из адресной строки !!!

  return (
    <div>
      <Link className="Photo-goback" to="/">
        --Go Back
      </Link>
      {photo ? (
        <>
          <img className="Photo-img" src={photo.src} alt={photo.alt} />
          <p className="Photo-title">{photo.title}</p>
          <p className="Photo-subtitle">{photo.subtitle}</p>
        </>
      ) : (
        <p className="Photo-note">No photo with such id</p>
      )}
    </div>
  );
};

export default Photo;

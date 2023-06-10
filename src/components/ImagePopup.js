import Popup from "./Popup";

export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <Popup isOpen={isOpen} name="img-card" onClose={onClose} onImgClass={true}>
      <img className="popup__zoom-image" src={card.link} alt={card.name} />
      <h3 className="popup__zoom-title">{card.name}</h3>
    </Popup>
  );
}

import successImg from "../images/tooltip.svg";
import errorImg from "../images/tooltip_error.svg";
import Popup from "./Popup";

export default function InfoTooltip({ onClose, isOpen, tooltip }) {
  return (
      <Popup isOpen={isOpen} name="tooltip" onClose={onClose}>
          <img
              className="popup__img"
              src={tooltip.image ? successImg : errorImg}
              alt={tooltip.message}
          />
          <h3 className="popup__title">{tooltip.message}</h3>
      </Popup>
  );
}

import { ButtonsApp } from "../Buttons/ButtonsApp";
import "./welcome.scss";

export const Welcome = ({ title, img, onClick, textButton }) => {
  return (
    <>
      <div className="main-vista-ppal">
        <h2 className="title-welcome p-3"> {title} </h2>
        <div className="photo-circle">
          <img className="photo-welcome object-fit-scale" src={img} alt="" />
        </div>
        <ButtonsApp
          className="mt-4"
          clickar={onClick}
          textButton={textButton}
          color="green-kakeibo"
        />
      </div>
    </>
  );
};

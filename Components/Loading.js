import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loading = () => {
  return (
    <center
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        backgroundColor: "#e3dfde",
      }}
    >
      <div>
        <img
          src="/whatsappLogo.svg"
          alt="whatsapp logo"
          height={350}
          style={{ marginBottom: 20 }}
        />
        <Loader type="Circles" color="#075E54" height={80} width={80} />
      </div>
    </center>
  );
};

export default Loading;

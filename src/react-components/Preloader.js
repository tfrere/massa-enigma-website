import LoadingSvg from "../public/loading.svg";

const Preloader = () => {
  return (
    <div className="screen center preloader">
      <div>
        <img src={LoadingSvg} />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Preloader;

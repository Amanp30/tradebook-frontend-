import { Oval, Radio } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Errorui = ({ showContent, children }) => {
  if (showContent === false)
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={10}
            strokeWidthSecondary={4}
          />
          <h2>Loading...</h2>
        </div>
        {/* <div className="loadingspinner">
          <Oval
            height={50}
            width={50}
            color="#374259"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#545B77"
            strokeWidth={8}
            strokeWidthSecondary={6}
          />
        </div> */}
      </>
    );

  if (showContent === "Server Error")
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <Radio
            visible={true}
            height="80"
            width="80"
            ariaLabel="radio-loading"
            wrapperStyle={{}}
            wrapperClass="radio-wrapper"
          />
          <h2>Server Error</h2>
          <p style={{ marginTop: "2em" }}>
            Go to{" ->      "}
            <Link
              to="/"
              style={{ textDecoration: "underline", fontWeight: "bolder" }}
            >
              Dashboard
            </Link>
          </p>
        </div>
      </>
    );

  if (showContent) return <>{children}</>;
};

export default Errorui;

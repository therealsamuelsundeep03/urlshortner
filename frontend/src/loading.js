import Lottie from "react-lottie";

import "../css/loading.css";
import loading from "../loading-state.json";

function Loading () {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loading,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    }

    return (
        <div className="loading">
            <Lottie 
            options={defaultOptions}
            height={250}
            width={250}
            className="loadingAnime"
            />
        </div>
    )
}

export default Loading;
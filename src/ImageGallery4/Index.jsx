import "./style.css";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useSmallScreen from "../ScreenSize/useSmallScreen";

export default function Index() {
    const [current, setCurrent] = useState(null);
    const [notCurrent, setNotCurrent] = useState(false);
    const [btnActive, setBtnActive] = useState(false);

    const isSmallScreen = useSmallScreen();

    const dataOne = [
        { id: 1, src: "https://i.pinimg.com/736x/bd/58/bf/bd58bf2c93f2ebc6f4ec3411e36f9e5a.jpg" },
        { id: 2, src: "https://i.pinimg.com/736x/a7/db/59/a7db59df7818e77c44c20a0bcb637525.jpg" },
        { id: 3, src: "https://i.pinimg.com/736x/08/72/0d/08720d791dc146cf7615c494ed7fd920.jpg" },
        { id: 4, src: "https://i.pinimg.com/736x/73/c8/2e/73c82e50df82741945f58b19db12a42f.jpg" },
        { id: 5, src: "https://i.pinimg.com/736x/d1/38/af/d138af243622559201b7dc6f04c5f6d9.jpg" },
        { id: 6, src: "https://i.pinimg.com/736x/aa/4b/c8/aa4bc8ccbf9af2c0622c321b8acc0425.jpg" },
        { id: 7, src: "https://i.pinimg.com/736x/4f/90/19/4f9019e3ade8ad357ba7f73ff4223ee7.jpg" },
        { id: 8, src: "https://i.pinimg.com/736x/1a/dc/66/1adc66402724b0523c5d583083cc8a93.jpg" },
        { id: 9, src: "https://i.pinimg.com/736x/a4/99/1c/a4991ce43ddbea1fd62d4cc858cb33e9.jpg" },
        { id: 10, src: "https://i.pinimg.com/736x/27/10/90/2710900af27294eac0ea53f20ca97638.jpg" },
        { id: 11, src: "https://i.pinimg.com/736x/93/77/e3/9377e3505aae2595a7212eb0d772ecc6.jpg" },
        { id: 12, src: "https://i.pinimg.com/736x/ee/69/2c/ee692ca59fa07ec48708fe48875d8ea0.jpg" },
    ];

    const handleMousemove = (e) => {
        const images = document.querySelectorAll(".images");

        if (current !== null) {
            // Reset all image transforms when any image is active
            images.forEach((img) => {
                img.style.transform = "translate(0, 0) scale(1)";
            });
            return;
        }

        images.forEach((img) => {
            const rect = img.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // For custom movement value
            // const id = parseInt(img.dataset.id);
            // const divX = id % 2 === 0 ? 40 : 60;
            // const divY = id % 2 === 0 ? 15 : 25;
            // 

            const offsetX = (e.clientX - centerX) / (isSmallScreen ? 50 : 50);
            const offsetY = (e.clientY - centerY) / (isSmallScreen ? 40 : 20);

            img.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.3)`;
        });
    };

    const handleClick = () => {
        const images = document.querySelectorAll(".images");
        images.forEach((img) => {
            img.style.transform = "translate(0, 0) scale(1)";
        });
    }

    return (
        <section id="myImages" onClick={handleClick} onMouseMove={handleMousemove}  >
            <div className="imagesWrapper">
                {dataOne.map((image) => {
                    const active = image.id === current;
                    return (
                        <motion.div
                            layout
                            className="imgDiv"
                            key={image.id}
                            onClick={() => {
                                setCurrent(image.id);
                                setNotCurrent(true);
                                setBtnActive(true);
                            }}
                            style={{
                                left: active ? "50%" : notCurrent ? (isSmallScreen ? `${(image.id - 1) * 8.4}%` : "93%") : "",
                                top: active ? "50%" : notCurrent ? (isSmallScreen ? "0" : `${(image.id - 1) * 6.7}%`) : "",
                                transform: `translate(${active ? "-50%, -50%" : "0,0"})`,
                                width: active ? "50vh" : notCurrent ? "4rem" : "",
                                height: active ? "70vh" : notCurrent ? "4rem" : "",
                                pointerEvents: notCurrent ? "none" : "",
                                zIndex: active ? 99 : 9,
                            }}
                        >
                            <img src={image.src}
                                className="images"
                                style={{
                                    transform: `scale(${active ? 1 : notCurrent ? 1.3 : 1.3})`,
                                }}
                            // For custom movement value
                            // data-id={image.id}
                            // 
                            />
                        </motion.div>
                    );
                })}
            </div>

            {btnActive && (
                <button
                    className="backButton"
                    onClick={() => {
                        setCurrent(null);
                        setNotCurrent(false);
                        setBtnActive(false);
                    }}
                >
                    back
                </button>
            )}
        </section>
    );
}

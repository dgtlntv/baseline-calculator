import FontMetrics from "fontmetrics"
import WebFont from "webfontloader"
import { useEffect, useState } from "react"

function App() {
    const fontFamily = "Ubuntu Sans"
    const fontSize = 16
    const lineHeight = 24

    const [baselinePosition, setBaselinePosition] = useState(0)

    useEffect(() => {
        WebFont.load({
            google: {
                families: [fontFamily],
            },
            active: () => {
                const metrics = FontMetrics({
                    fontFamily: fontFamily,
                    fontWeight: "normal",
                    fontSize: fontSize,
                    origin: "top",
                })
                setBaselinePosition(metrics.baseline * fontSize + (lineHeight - fontSize) / 2)
                console.log(metrics)
                console.log(metrics.baseline * fontSize)
                console.log(
                    "Add",
                    lineHeight - (metrics.baseline * fontSize + (lineHeight - fontSize) / 2),
                    "px to the top"
                )
            },
        })
    }, [])

    return (
        <div style={{ position: "relative" }}>
            <p
                style={{
                    all: "unset",
                    fontFamily: fontFamily,
                    fontWeight: "normal",
                    fontSize: `${fontSize}px`,
                    lineHeight: `${lineHeight}px`,
                }}
            >
                hello world :)
            </p>
            <div
                style={{
                    position: "absolute",
                    height: "1px",
                    backgroundColor: "red",
                    width: "100%",
                    top: `${baselinePosition}px`,
                }}
            />
        </div>
    )
}

export default App

import FontMetrics from "fontmetrics"
import WebFont from "webfontloader"
import { useEffect, useState } from "react"

function App() {
    const fontFamily = "Ubuntu Sans"
    const fontSize = 1.5
    const lineHeight = 2
    const spUnit = 0.5

    const ubuntuSansLineHeightScale = 1.2
    const ubuntuSansAscenderHeightScale = 0.94
    const [baselinePosition, setBaselinePosition] = useState(0)

    function calculateBaselineKick(num) {
        let remainder = num % spUnit
        if (remainder === 0) {
            return 0
        } else {
            return spUnit - remainder
        }
    }

    useEffect(() => {
        console.clear()
        const distanceToBaseline =
            (lineHeight - ubuntuSansLineHeightScale * fontSize) / 2 + fontSize * ubuntuSansAscenderHeightScale

        const addOnTop = calculateBaselineKick(distanceToBaseline)
        const addOnBottom = calculateBaselineKick(lineHeight + addOnTop)
        console.log("Add", addOnTop, "rem on top.")
        console.log("Add", addOnBottom, "rem on bottom.")
        setBaselinePosition(distanceToBaseline)
    }, [])

    return (
        <div style={{ position: "relative" }}>
            <p
                style={{
                    all: "unset",
                    fontFamily: fontFamily,
                    fontWeight: "normal",
                    fontSize: `${fontSize}rem`,
                    lineHeight: `${lineHeight}rem`,
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
                    top: `${baselinePosition}rem`,
                }}
            />
        </div>
    )
}

export default App

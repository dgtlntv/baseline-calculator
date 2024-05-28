import { useEffect, useState } from "react"

function App() {
    const fontFamily = "Ubuntu Sans"
    const oneRem = 16
    const [fontSize, setFontSize] = useState(16)
    const [lineHeight, setLineHeight] = useState(24)

    const ubuntuSansLineHeightScale = 1.2
    const ubuntuSansAscenderHeightScale = 0.94
    const [baselinePosition, setBaselinePosition] = useState(0)
    const [addTop, setAddTop] = useState(0)
    const [addBottom, setAddBottom] = useState(0)

    function nextDivisibleByHalfRem(num) {
        let remainder = num % 8
        console.log("num", num)
        console.log("remainder", remainder)
        if (remainder === 0) {
            return 0
        } else {
            return 8 - remainder
        }
    }

    useEffect(() => {
        console.clear()
        const baselinePos =
            Math.floor(Math.round(lineHeight - Math.round(ubuntuSansLineHeightScale * fontSize)) / 2) +
            Math.round(fontSize * ubuntuSansAscenderHeightScale)
        const addOnTop = Math.round(nextDivisibleByHalfRem(baselinePos))
        const addOnBottom = nextDivisibleByHalfRem(lineHeight + addOnTop)
        setAddTop(addOnTop)
        setAddBottom(addOnBottom)
        setBaselinePosition(baselinePos)
    }, [fontSize, lineHeight])

    return (
        <>
            <div>
                <div>
                    <label>Font size</label>
                    <input
                        type="number"
                        defaultValue={16}
                        onChange={(e) => {
                            setFontSize(Number(e.target.value))
                        }}
                    ></input>
                </div>

                <div>
                    <label>Line height</label>
                    <input
                        type="number"
                        defaultValue={24}
                        onChange={(e) => {
                            setLineHeight(Number(e.target.value))
                        }}
                    ></input>
                </div>
            </div>

            <div
                className="u-baseline-grid"
                style={{ position: "relative", paddingTop: "64px", paddingBottom: "64px" }}
            >
                <p
                    style={{
                        fontFamily: fontFamily,
                        fontWeight: "normal",
                        fontSize: `${fontSize}px`,
                        lineHeight: `${lineHeight}px`,
                        paddingTop: `${addTop}px`,
                        marginBottom: `${addBottom}px`,
                    }}
                >
                    hello world :)
                </p>
                <p
                    style={{
                        fontFamily: fontFamily,
                        fontWeight: "normal",
                        fontSize: `${fontSize}px`,
                        lineHeight: `${lineHeight}px`,
                        paddingTop: `${addTop}px`,
                        marginBottom: `${addBottom}px`,
                    }}
                >
                    hello world :)
                </p>
                <p
                    style={{
                        fontFamily: fontFamily,
                        fontWeight: "normal",
                        fontSize: `${fontSize}px`,
                        lineHeight: `${lineHeight}px`,
                        paddingTop: `${addTop}px`,
                        marginBottom: `${addBottom}px`,
                    }}
                >
                    hello world :)
                </p>
            </div>

            <div>
                <p>Result:</p>
                <p>Add {addTop} on top.</p>
                <p>Add {addBottom} on bottom.</p>
            </div>
        </>
    )
}

export default App

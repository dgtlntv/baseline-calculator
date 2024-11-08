import { useEffect, useState } from "react"

function App() {
    const fontFamily = "Ubuntu Sans"
    const ubuntuSansCapsizeScale = 0.693
    const ubuntuSansAscenderHeightScale = 0.94

    const [fontSize, setFontSize] = useState(16)
    const [lineHeight, setLineHeight] = useState(24)

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

    function calculateBaselinePosition(
        lineHeight,
        fontSize,
        ascenderConstant,
        capsizeConstant
    ) {
        // Convert all inputs to integers
        const containerHeight = lineHeight | 0
        const fontHeight = fontSize | 0
        const defaultBaseline = (fontSize * ascenderConstant) | 0
        const capHeight = (fontSize * capsizeConstant) | 0

        // Distance between baseline and cap height
        const baselineToCapDistance = (defaultBaseline - capHeight) | 0

        // Limit how much we can move the baseline up or down
        const maxUpwardShift = Math.min(0, containerHeight - fontHeight) | 0
        const maxDownwardShift = Math.abs(containerHeight - fontHeight) | 0

        // Calculate available space and desired baseline adjustment
        const availableSpace = (containerHeight - capHeight) | 0
        const baselineAdjustment =
            ((availableSpace / 2) | 0) - baselineToCapDistance

        // Ensure baseline adjustment stays within bounds
        const clampedAdjustment =
            Math.min(
                Math.max(baselineAdjustment, maxUpwardShift),
                maxDownwardShift
            ) | 0

        return (defaultBaseline + clampedAdjustment) | 0
    }

    useEffect(() => {
        console.clear()

        const baselinePos = calculateBaselinePosition(
            lineHeight,
            fontSize,
            ubuntuSansAscenderHeightScale,
            ubuntuSansCapsizeScale
        )

        console.log("baselinePos", baselinePos)

        const addOnTop = nextDivisibleByHalfRem(baselinePos)
        const addOnBottom = nextDivisibleByHalfRem(lineHeight + addOnTop)

        setAddTop(addOnTop)
        setAddBottom(addOnBottom)
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
                style={{
                    position: "relative",
                    paddingTop: "64px",
                    paddingBottom: "64px",
                }}
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
                <p>Add {addTop} px on top.</p>
                <p>Add {addBottom} px on bottom.</p>
            </div>
        </>
    )
}

export default App

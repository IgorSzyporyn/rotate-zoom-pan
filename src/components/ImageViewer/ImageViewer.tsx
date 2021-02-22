import React, {
  useEffect,
  useState,
  MouseEvent as ReactMouseEvent,
} from "react"
import styled from "styled-components"
import Zoom from "react-img-zoom"
import { getProductImageUrl } from "../../api"

const Wrapper = styled.section`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 15px -4px rgb(220 220 220);
  box-shadow: 0 50px 100px rgb(48 72 87 / 5%), 0 5px 15px rgb(0 0 0 / 5%);
  padding: 18px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

type PresenterProps = {
  rotating: boolean
}

const Presenter = styled.ul<PresenterProps>`
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  height: 560px;
  width: 560px;
  cursor: ${({ rotating }) => (rotating ? "grab" : "pointer")};
`

const Frame = styled.li``

const PanImage = styled(Zoom)`
  border: none;
`

const RotateImage = styled.img`
  border: none;
`

const Information = styled.p`
  padding: 0;
  text-align: center;
  margin: 0;
  position: relative;
  font-size: 18px;
  top: -36px;
`

type ImageViewerProps = {
  customerId: string
  productId: string
  speed: number
}

const ImageViewer = ({ customerId, productId, speed }: ImageViewerProps) => {
  const [panView, setPanView] = useState(false)
  const [rotateState, setRotateState] = useState({
    allowRotate: true,
    rotating: false,
    screenX: 0,
    delta: 0,
    frame: 1,
  })
  const frames = [...Array(32).keys()]

  const handleMouseDown = (event: ReactMouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

    setRotateState({
      ...rotateState,
      rotating: true,
      screenX: event.screenX,
    })
  }
  useEffect(() => {
    const handleMouseUp = (event: MouseEvent) => {
      setRotateState({
        ...rotateState,
        screenX: event.screenX,
        rotating: false,
      })
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!panView && rotateState.rotating) {
        const delta = event.screenX - rotateState.screenX
        const isIncrement = delta % speed === 0
        let frame = delta > 0 ? rotateState.frame + 1 : rotateState.frame - 1

        if ((rotateState.frame === 32 && delta > 0) || rotateState.frame <= 0) {
          frame = 1
        }

        if (rotateState.frame === 1 && delta < 0) {
          frame = 32
        }

        if (isIncrement) {
          setRotateState({
            ...rotateState,
            screenX: event.screenX,
            delta: event.screenX - rotateState.screenX,
            frame,
          })
        }
      }
    }

    document.addEventListener("mousemove", handleMouseMove, false)
    document.addEventListener("mouseup", handleMouseUp, false)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove, false)
      document.removeEventListener("mouseup", handleMouseUp, false)
    }
  }, [setRotateState, rotateState, panView, speed])

  return (
    <Wrapper>
      <Presenter onMouseDown={handleMouseDown} rotating={rotateState.rotating}>
        {frames.map((i) => {
          const frame = i + 1
          const imageSource = getProductImageUrl({
            customerId,
            productId,
            frame,
          })

          return (
            <Frame
              key={`Frame-${customerId}-${productId}-${frame}`}
              hidden={frame !== rotateState.frame}
              aria-hidden={frame !== rotateState.frame}
            >
              {panView ? (
                <div
                  onClick={() => {
                    setPanView(false)
                  }}
                >
                  <PanImage
                    draggable="false"
                    img={`${imageSource}?zoom=4k`}
                    zoomScale={3}
                    width={560}
                    height={560}
                  />
                </div>
              ) : (
                <RotateImage
                  alt={`Product Frame ${frame} for ${productId}`}
                  draggable="false"
                  onClick={() => {
                    setPanView(true)
                  }}
                  src={imageSource}
                />
              )}
            </Frame>
          )
        })}
      </Presenter>
      <Information>Drag to Rotate - Click to Zoom</Information>
    </Wrapper>
  )
}

export default ImageViewer

import React from "react"
import styled from "styled-components"
import ImageViewer from "./components/ImageViewer/ImageViewer"

const Wrapper = styled.main`
  display: flex;
  height: 100%;
  min-height: 100%;
  justify-content: center;
  align-items: center;
`

function App() {
  return (
    <Wrapper>
      <ImageViewer customerId="4404" productId="ARCHIBALDCHAIR" />
    </Wrapper>
  )
}

export default App

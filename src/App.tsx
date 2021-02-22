import React from "react"
import styled from "styled-components"
import ImageViewer from "./components/ImageViewer/ImageViewer"

const Wrapper = styled.main`
  display: flex;
  height: 100%;
  min-height: 100%;
  justify-content: center;
  align-items: center;
  user-select: none;
`

function App() {
  return (
    <Wrapper>
      <ImageViewer customerId="4404" productId="ARCHIBALDCHAIR" speed={2} />
    </Wrapper>
  )
}

export default App

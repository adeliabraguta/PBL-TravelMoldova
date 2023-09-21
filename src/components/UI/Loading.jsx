import styled from "styled-components";

export default function Loading(){
    return(
        <Loader>
            <div className="loader"></div>
        </Loader>
    )
}
const Loader =styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .loader {
    border: 4px solid rgba(0, 0, 0, .1);
    border-left-color: transparent;
    border-radius: 50%;
  }

  .loader {
    border: 4px solid rgba(0, 0, 0, .1);
    border-left-color: transparent;
    width: 36px;
    height: 36px;
  }

  .loader {
    border: 4px solid rgba(0, 0, 0, .1);
    border-left-color: transparent;
    width: 36px;
    height: 36px;
    animation: spin89345 1s linear infinite;
  }

  @keyframes spin89345 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`
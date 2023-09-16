import {useState} from "react";
import styled from "styled-components";
import {IoChevronDown, IoChevronUp} from "react-icons/io5";

export default function InformationComponent({info}) {
const [isActive, setIsActive] = useState(false)

    return (
        <Information>

                    <div className="item">
                        <div className="question-div" onClick={() => setIsActive(!isActive)}>
                            <h2 className="question"> {info.question}</h2>
                            {isActive ? <IoChevronUp className={"icon"}></IoChevronUp>  :   <IoChevronDown className={"icon"}></IoChevronDown>  }
                        </div>
                        <p className={isActive ? 'show'  : 'hidden' }>{info.answer} </p>
                    </div>

        </Information>
    )
}
const Information = styled.div`
  .item {
    border-bottom: solid #F0F4F8;
    padding: 16px;
    color: #102A43;
    width: 600px;
    

    .question-div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: 0.3s ease;

      .question {
        color: #102A43;
        margin: 0;
        font-weight: 600;
        font-size: 18px;

      }

      .icon {
        height: 18px;
        width: 18px;
        color: #102A43;
      }
    }

    .show {
      margin: 0;
      font-weight: 300;
      font-size: 18px;
      display: block;
      padding-top: 16px;
    }

    .hidden {
      display: none;
    }
    
  }
`



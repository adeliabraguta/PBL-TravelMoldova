import {Link} from "react-router-dom";
import styled from "styled-components";

export default function StoriesComponent({story}) {
    return (
        <div>
            <Story>
                <img className="img" src={`../assets/${story.img}`}/>
                <div className="question">
                    <Link className="link" to={`/story/${story.id}/${story.slug}`}>
                        <h1 className="title">{story.title} </h1>
                    </Link>
                    <p className="description">{story.description}</p>
                    <div className="post-info">
                        <h2 className="author">BY {story.author}</h2>
                        <p className="date">{story.date}</p>
                    </div>
                </div>
            </Story>
        </div>
    )
}
const Story = styled.div `
  height: 30vh;
  width: 50vw;
  position: relative;
  color: #102A43;
  .img{
    height: 30vh;
    width: 50vw;
    object-fit: cover;
    opacity: 40%;
  }
  .question{
    position: absolute;
    top: 50%;
    transform: translate(0%, -50%);
    display: grid;
    gap: 24px;
    justify-content: center;
    padding: 32px;
    .link{
      text-decoration: none;
    }
    .title{
      font-size: 24px;
      margin: 0;
      max-width: 80%;
      font-weight: 700;
      color: #243B53;
      border-top: solid transparent;
      border-bottom: solid transparent;
      display: inline-block;
      //padding: 0 12px 0 0;
      &:hover{
        //border-top: solid #2DCCA7;
        border-bottom: solid #2DCCA7;
      }
    }
    .description{
      margin: 0;
      font-size: 16px;
    }
    .post-info{
      display: flex;
      gap: 24px;
      align-items: center;
      color: #003E6B;
      .author{
        margin: 0;
        letter-spacing: 1.2px;
        font-size: 18px;
        font-weight: 600;
      }
      .date{
        margin: 0;
        letter-spacing: 1.2px;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
`
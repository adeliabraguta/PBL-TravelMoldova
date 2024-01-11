import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Banner, Desc, Line, Title } from "../Styles/Banner.js";
import {useGetStoryByIdQuery} from "../app/services/apiStories.js";

export default function StoryComponent() {
  const { id } = useParams();
  const { data: story = [] } = useGetStoryByIdQuery(id);

  return (
    <div>
      <Story>
        <Line>
          <div className="story">
            <Banner>
              <Desc>STORY TIME</Desc>
              <Title>{story.title}</Title>
            </Banner>
            <p className="question">{story.desc}</p>
            <div className={"images"}>
              <img src={`/assets/${story.img}`} alt={story.desc} />
              <img src={`/assets/${story.img1}`} alt={story.desc} />
            </div>
            <div className="post-info">
              <h2 className="author">BY {story.author}</h2>
              <p className="date">{story.date}</p>
            </div>
          </div>
        </Line>
      </Story>
    </div>
  );
}

const Story = styled.div`
  padding-top: 96px;

  .carousel-div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .line {
    margin: 0 48px 48px 48px;
    border-top: solid #102a43;
  }

  .story {
    top: 65%;
    right: 96px;
    padding: 0 96px 96px 96px;
    display: grid;
    justify-content: center;

    .desc {
      margin: 0;
      color: #079a82;
      letter-spacing: 1.5px;
      font-size: 14px;
      font-weight: 600;
      text-align: center;
    }

    .title {
      padding-top: 12px;
      color: #102a43;
      margin: 0;
      text-align: center;
      font-size: 24px;
    }

    .question {
      color: #102a43;
      line-height: 1.3;
      padding-top: 32px;
      text-align: center;
    }

    .post-info {
      padding-top: 48px;
      display: flex;
      gap: 24px;
      align-items: center;
      color: #003e6b;
      justify-content: center;

      .author {
        margin: 0;
        letter-spacing: 1.2px;
        font-size: 16px;
        font-weight: 600;
      }

      .date {
        margin: 0;
        letter-spacing: 1.2px;
        font-size: 16px;
        font-weight: 600;
      }
    }

    .images {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        padding-top: 48px;
        height: 50vh;
        width: 70vw;
        object-fit: cover;
      }
    }
  }
`;
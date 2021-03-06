import React, { FunctionComponent, useEffect } from "react";
import styled from "styled-components/native";
import Background from "../assets/backgrounds/books.jpg";
import { useSelector } from "react-redux";
import { RootStackParamList } from "../navigators/RootStack";
import { StackScreenProps } from "@react-navigation/stack";
import { BackgroundImage, CenterText, RootState } from "../components/shared";
import { useDispatch } from "react-redux";
import { setChapters } from "../redux/actions";
import { getData } from "../apiData";

type Props = StackScreenProps<RootStackParamList, "SingleBooksChapter">;

const SingleBooksChapter: FunctionComponent<Props> = ({ route }) => {
  const dispatch = useDispatch();

  const createChapters = async () => {
    dispatch(setChapters(await getData("/chapter/")));
  };

  useEffect(() => {
    createChapters();
  }, []);

  const { chapters } = useSelector((state: RootState) => state.booksReducer);

  return (
    <BackgroundImage source={Background} resizeMode="cover" blurRadius={3}>
      <ChaptersContainer>
        <TitleWrap>
          <TitleText>{route.params.name} chapters:</TitleText>
        </TitleWrap>
        {chapters
          .filter(
            (singleChapter: { book: string }) =>
              singleChapter["book"] === route.params._id
          )
          .map((chapter: { chapterName: string }, number: number) => (
            <TextWrap key={number}>
              <BookText key={number}>
                {number + 1}. {chapter.chapterName}
              </BookText>
            </TextWrap>
          ))}
      </ChaptersContainer>
    </BackgroundImage>
  );
};

const ChaptersContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const TextWrap = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  margin: 15px;
  border-radius: 20px;
`;

const BookText = styled(CenterText)`
  font-size: 20px;
  padding: 10px 15px;
`;

const TitleText = styled(BookText)`
  margin-bottom: 5px;
`;

const TitleWrap = styled(TextWrap)`
  width: 100%;
  margin: 0;
  border-radius: 0;
`;

export default SingleBooksChapter;

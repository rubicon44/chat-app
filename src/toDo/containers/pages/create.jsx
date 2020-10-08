import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { db } from '../../../infra/firebase.js';

import Header from '../../../components/containers/organisms/header';

const Head = styled.div`
  display: flex;
  justify-content: flex-end;

  // todo:子要素にそのままmarginを当てたくないため、「親要素Coverの子要素のaタグ」へのスタイリング指定を行う。
  > a:first-of-type {
    margin-right: 10px;
  }
`

const ButtonStyle = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  background-color: #ff444f;
`

const TopBackground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 460px;
  text-align: center;
  background-color: #ddd;
`

const Title = styled.h1`
  width: 288px;
  color: #ff444f;
  font-size: 36px;
  font-family: YuMincho;
`

const FormCover = styled.div`
  width: 300px;
  text-align: left;
`

const FormTitleCover = styled.div`
  margin-bottom: 10px;

  > label {
    display: block;
  }

  > input {
    width: 300px;
  }
`

const FormTextAreaCover = styled.div`
  margin-bottom: 10px;

  > label {
    display: block;
  }

  > textarea {
    width: 300px;
    min-height: 200px;
  }
`

const FormInputCover = styled.div`
  margin-bottom: 10px;

  > label {
    display: block;
  }

  > input {
    width: 300px;
  }
`

const FormButtonCover = styled.div`
  display: flex;
  justify-content: flex-end;
`

class Create extends React.Component {
  constructor(props) {
    super(props);
    // boards collectionを取得
    this.ref = db.collection('boards');
    this.state = {
      title: '',
      description: '',
      author: '',
    }
  }

  handleTextChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleTextSubmit = (e) => {
    e.preventDefault();
    const { title, description, author } = this.state;
    // Firebase Firestoreでデータの永続化
    this.ref.add({
        title,
        description,
        author,
    })
    .then((docRef) => {
      this.setState({
        title: '',
        description: '',
        author: '',
      });
      this.props.history.push("/toDo");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { title, description, author } = this.state;

    return (
      <div>
        <Header />
        <Head>
          <ButtonStyle to="/toDo">一覧へ戻る</ButtonStyle>
        </Head>
        <TopBackground>
          <Title>新規登録</Title>
          <FormCover>
            <form onSubmit={this.handleTextSubmit}>
              <FormTitleCover>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" value={title} onChange={this.handleTextChange} placeholder="Title" />
              </FormTitleCover>
              <FormTextAreaCover>
                <label htmlFor="description">Description:</label>
                <textarea name="description" onChange={this.handleTextChange} placeholder="Description" cols="80" rows="3" value={description}></textarea>
              </FormTextAreaCover>
              <FormInputCover>
                <label htmlFor="author">Author:</label>
                <input type="text" name="author" value={author} onChange={this.handleTextChange} placeholder="Author" />
              </FormInputCover>
              <FormButtonCover><button type="submit">Submit</button></FormButtonCover>
            </form>
          </FormCover>
        </TopBackground>
      </div>
    );
  }
}

export default Create;
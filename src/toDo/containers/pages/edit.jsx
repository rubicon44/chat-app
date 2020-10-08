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

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      description: '',
      author: '',
    }
  }

  componentDidMount = () => {
    const ref = db.collection('boards').doc(this.props.match.params.id);
    ref.get()
    .then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          title: board.title,
          description: board.description,
          author: board.author,
        });
      } else {
        console.log("No such document");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ board: state });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { title, description, author } = this.state;
    const updateRef = db.collection('boards').doc(this.state.key);
    updateRef.set({
      title,
      description,
      author
    })
    .then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: '',
        author: '',
      });
      this.props.history.push("/show/" + this.props.match.params.id);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Head>
          <ButtonStyle to={`/show/${this.state.key}`}>詳細に戻る</ButtonStyle>
        </Head>
        <TopBackground>
          <Title>EDIT BOARD</Title>
          <FormCover>
            <form onSubmit={this.onSubmit}>
              <FormTitleCover>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title"/>
              </FormTitleCover>
              <FormTextAreaCover>
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description"/>
              </FormTextAreaCover>
              <FormInputCover>
                <label htmlFor="author">Author:</label>
                <input type="text" name="author" value={this.state.author} onChange={this.onChange} placeholder="Author"/>
              </FormInputCover>
              <FormButtonCover><button type="submit">Submit</button></FormButtonCover>
            </form>
          </FormCover>
        </TopBackground>
      </div>
    );
  }
}

export default Edit;
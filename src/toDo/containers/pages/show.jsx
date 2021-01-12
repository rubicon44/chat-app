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

const ToDoListCover = styled.div`
  width: 300px;
  margin-top: 20px;
  text-align: left;
`

const ToDoList = styled.dl`
  padding: 25px;
  border: 1px solid #fff;
  border-radius: 4px;
  box-sizing: border-box;

  > dt {
    margin-bottom: 5px;
  }

  > dd {
    &:not(:last-of-type) {
      margin-bottom: 20px;
    }
  }
`

const ToDoListButtonGroup = styled.div`
  text-align: right;
`

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: '',
    }
  }

  componentDidMount = () => {
    const ref = db.collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false,
        });
      } else {
        console.log("No such document.");
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  delete = (id) => {
    db.collection('boards').doc(id).delete()
    .then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/toDo");
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
          <ButtonStyle to="/toDo">ToDo一覧</ButtonStyle>
          <ButtonStyle to="/create">新規登録</ButtonStyle>
        </Head>
        <TopBackground>
          <Title>{this.state.board.title}</Title>
          <ToDoListCover>
            <ToDoList>
              <dt>Description:</dt>
              <dd>{this.state.board.description}</dd>
              <dt>Author:</dt>
              <dd>{this.state.board.author}</dd>
            </ToDoList>
            <ToDoListButtonGroup>
              <Link to={`/edit/${this.state.key}`}>Edit</Link>
              <button onClick={() => this.delete(this.state.key)}>Delete</button>
            </ToDoListButtonGroup>
          </ToDoListCover>
        </TopBackground>
      </div>
    );
  }
}

export default Show;
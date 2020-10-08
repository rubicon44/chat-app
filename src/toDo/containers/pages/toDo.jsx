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
  min-height: 460px;
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
`

const ToDoList = styled.table`
  display: flex;
  padding: 25px;
  margin-top: 30px;
  text-align: left;
  border: 1px solid #fff;
  border-radius: 4px;
  box-sizing: border-box;

  > thead {
    width: 150px;

    > tr > th {
        display: block;
        height: 60px;
    }
  }

  > tbody {
    > tr > td {
      display: block;
      height: 60px;
      width: 300px;

      > em {
        font-weight: bold;
        text-decoration: underline;
      }
    }
  }
`

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    // Firebase Firestoreとのデータ通信
    this.ref = db.collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: [],
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
        const { title, description, author } = doc.data();
        boards.push({
            key: doc.id,
            title: title,
            description: description,
            author: author,
            // doc: doc,
        });
    });
    this.setState({
        boards: boards,
    });
  }

  componentDidMount = () => {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount = () => {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <Header />
        <Head>
          <ButtonStyle to="/create">新規登録</ButtonStyle>
        </Head>
        <TopBackground>
          <Title>ToDo一覧</Title>
          <ToDoListCover>
          {this.state.boards.map(board =>
            <ToDoList>
              <thead>
                <tr>
                <th>Title</th>
                <th>Description</th>
                <th>author</th>
                </tr>
              </thead>
            <tbody>
                <tr key={board.key}>
                  <td><em><Link to={`/show/${board.key}`}>{board.title}</Link></em></td>
                  <td>{board.description}</td>
                  <td>{board.author}</td>
                </tr>
            </tbody>
            </ToDoList>
            )}
          </ToDoListCover>
        </TopBackground>
      </div>
    );
  }
}

export default ToDo;

import { Colors, Fonts, FontSizes } from '../app/Styles';


const _styles = {
  container: RX.Styles.createViewStyle({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  }),
  container2: RX.Styles.createViewStyle({
    flex: 1,
    width: 300,
    paddingHorizontal: 10,
    height: 500,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  }),
  todoTitleV: RX.Styles.createTextStyle({
    margin: 2,
    fontSize: FontSizes.size14,
    color: Colors.white,
    backgroundColor: 'transparent',
  }),
  todoTitle2: RX.Styles.createTextStyle({
    margin: 2,
    fontSize: FontSizes.size20,
    color: Colors.white,
    backgroundColor: 'transparent',
  }),
  todoTitle: RX.Styles.createTextStyle({
    margin: 2,
    alignSelf: 'stretch',
    fontSize: FontSizes.size20,
    color: Colors.white,
    backgroundColor: 'transparent',
  }),
  todoHeader: RX.Styles.createTextStyle({
    margin: 2,
    fontSize: FontSizes.size16,
    alignSelf: 'stretch',
    color: Colors.white,
    backgroundColor: 'transparent',
  }),
  todoTextPoll1: RX.Styles.createTextStyle({
    margin: 2,
    fontSize: FontSizes.size16,
    alignSelf: 'stretch',
    color: '#00FF0A',
    backgroundColor: 'transparent',
  }),
  todoTextPoll2: RX.Styles.createTextStyle({
    margin: 2,
    fontSize: FontSizes.size16,
    alignSelf: 'stretch',
    color: '#FF0000',
    backgroundColor: 'transparent',
  }),
  todoTextW: RX.Styles.createTextStyle({
    margin: 2,
    fontSize: FontSizes.size16,
    alignSelf: 'stretch',
    color: 'green',
    backgroundColor: 'transparent',
  }),
  todoText: RX.Styles.createTextStyle({
    margin: 2,
    fontSize: FontSizes.size16,
    alignSelf: 'stretch',
    color: Colors.white,
    backgroundColor: 'transparent',
  }),
  todoText4: RX.Styles.createTextStyle({
    margin: 2,
    fontSize: FontSizes.size14,
    alignSelf: 'stretch',
    color: 'yellow',
    backgroundColor: 'transparent',
  }),
  todoText3: RX.Styles.createTextStyle({
    margin: 2,
    fontSize: FontSizes.size12,
    alignSelf: 'stretch',
    color: Colors.white,
    backgroundColor: 'transparent',
  }),
  buttonContainer3: RX.Styles.createViewStyle({
    margin: 2,
    height: 200,
    width: 400,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    alignItems: 'center',
  }),
  buttonContainer: RX.Styles.createViewStyle({
    margin: 2,
    height: 80,
    width: 400,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    alignItems: 'center',
  }),
  buttonContainer2: RX.Styles.createViewStyle({
    margin: 2,
    width: 400,
    height: 450,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'column',
  }),
  container3: RX.Styles.createViewStyle({
    flex: 1,
    width: 350,
    alignSelf: 'center',
    paddingHorizontal: 10,
    height: 350,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  buttonContainer4: RX.Styles.createViewStyle({
    margin: 2,
    width: 360,
    height: 150,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  editTodoItem: RX.Styles.createTextInputStyle({
    margin: 0,
    marginHorizontal: 8,
    height: 37,
    width: 300,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    opacity: 0.5,
    backgroundColor: '#323238',
    paddingHorizontal: 4,
    fontSize: FontSizes.size16,
    alignSelf: 'stretch',
  }),
  editTodoItem2: RX.Styles.createTextInputStyle({
    margin: 4,
    marginHorizontal: 8,
    height: 37,
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    opacity: 0.5,
    backgroundColor: '#323238',
    paddingHorizontal: 4,
    fontSize: FontSizes.size16,
    alignSelf: 'stretch',
  }),
  label: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: FontSizes.size12,
    color: Colors.menuText,
  }),
  label2: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: FontSizes.size12,
    color: Colors.menuText2,
  }),
  label3: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: FontSizes.size12,
    color: 'black',
  })
};
import ImageSource from 'modules/images';

import * as RX from 'reactxp';
import * as UI from '@sproutch/ui';
import TodoListPanel2 from './TodoListPanel2';
import { Todo, Option } from '../models/TodoModels';
import { useEffect, useState } from 'react';
import TodosStore from '../stores/TodosStore';
import CurrentUserStore from '../stores/CurrentUserStore';
import _ = require('lodash');

const Moralis = require('moralis');
const serverUrl = "https://qqdpez4ourk2.moralishost.com:2053/server";
const appId = "kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk";
Moralis.start({ serverUrl, appId });


export const ViewTodoHook = ({
  isLogin,
  todo,
  userAddress,
  options,
  option,
  todoId,
  isTiny,
}: {
  todo: Todo;
  isLogin: boolean;
  options: Option[];
  isTiny: boolean;
  option: Option;
  todoId: string;
  userAddress: string;
}) => {
  useEffect(() => {

    TodosStore.setOptionsById(todoId)
  }, [todo])


  const [alert, setAlert] = useState('')
  const [lock, setLock] = useState(false)
  const [votefor, setVoteFor] = useState('')
  const [load, setCargando] = useState(false)

  const _onPressCopy = async (e: RX.Types.SyntheticEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText('http://localhost:5000/polls?selected=' + todo.pollId)


    return
  };
  const _onPressClose = async (e: RX.Types.SyntheticEvent) => {
    e.stopPropagation()

    setCargando(true)
    const final: Todo = await Moralis.Cloud.run('setPollClosed', { pollId: todo.pollId })
    console.log(final);
    await TodosStore.resetOption()

    setCargando(false)

    return
  };
  const _onPressVote = async (e: RX.Types.SyntheticEvent) => {
    e.stopPropagation()

    setCargando(true)

    const isMetaMaskInstalled = await Moralis.isMetaMaskInstalled();


    if (!isMetaMaskInstalled) {
      CurrentUserStore.setLogin(false)

      setAlert("Must Install Metamask First")
      setCargando(false)
      return

    }
    await Moralis.enable();
    setAlert('')
    try {
      await Moralis.Web3.authenticate().then(async (user: any) => {

        let address = user.get('ethAddress')
        let transactions1 = await getTransactions1(address)
        let transactions2 = await getTransactions2(address)
        let transactions3 = await getTransactions3(address)

        if ((transactions1 !== undefined && transactions2 !== undefined && transactions3 !== undefined) || transactions1.total !== 0 || transactions2.total !== 0 || transactions3.total !== 0) {


          CurrentUserStore.setLogin(true)
          setAlert('')
          CurrentUserStore.setCargando(false)
          let id = user.get('objectId')
          CurrentUserStore.setUser(id, '', address, transactions1.total, transactions2.total, transactions3.total)

          let resto = _.filter(options, todo => todo.id !== option.id)
          let find = _.find(options, todo => todo.id === option.id)



          const result: any = await Moralis.Cloud.run('getPollById', { pollId: todo.pollId })
          if (result.openPoll === false) {

            setCargando(false)
            setLock(true)
            return
          }
          if (result !== undefined) {

            let owners: string[] = []
            owners = [...result.owners]
            if (owners === undefined) {
              setCargando(false)
              return
            }
            let checkcount = 0;
            for (let i = 0; i < owners.length; i++) {
              if (address == owners[i]) {
                checkcount++;
              }
            }
            if (checkcount == 0) {
              var newOptions: Option[] = [];
              if (find && resto) {
                let copy = find
                copy.votes = find.votes + 1


                newOptions = [...resto, copy]
              } else {
                return
              }
              setVoteFor(option.title)
              const final: Todo = await Moralis.Cloud.run('setPollOwner', { pollId: todo.pollId, address, newOptions })

              if (final) {

                setCargando(false)
                setLock(true)
                return
              }
            } else {
              setCargando(false)
              setLock(true)
              return
            }



            setCargando(false)
            return
          }
          setCargando(false)
          return


        } else {
          setAlert('Must have at least one transaction  on Ethereum, Binance Smart Chain or Polygon Network')

          setCargando(false)
          return
        }
      })
    } catch (error) {
      setCargando(false)
      if (error.message === 'Invalid session token') {

        setAlert('invalid session')
        setLock(true)
        return
      } else if (error.message == "MetaMask Message Signature: User denied message signature.") {

        setAlert('User closed modal')
        return
      }
      console.log('error' + error.message)
      setAlert(JSON.stringify(error.message))
    }
    return
  };
  async function getTransactions3(address: string) {


    const options3 = { chain: "matic", address: address, order: "desc", from_block: "0" };


    let res = await Moralis.Web3API.account.getTransactions(options3);
    return res
  }


  async function getTransactions2(address: string) {


    const options2 = { chain: "bsc", address: address, order: "desc", from_block: "0" };

    let res = await Moralis.Web3API.account.getTransactions(options2);
    return res
  }

  async function getTransactions1(address: string) {

    const options1 = { chain: "eth", address: address, order: "desc", from_block: "0" };
    let res = await Moralis.Web3API.account.getTransactions(options1);
    return res
  }

  return (<RX.View style={_styles.container}>
    <UI.Paper elevation={10} style={{ root: { marginBottom: isTiny ? 50 : 0, flexDirection: isTiny ? 'column' : 'row', borderRadius: 12, backgroundColor: '#323238', width: isTiny ? 370 : 700, height: isTiny ? 550 : 500, } }} >

      <RX.View style={isTiny ? _styles.buttonContainer3 : [_styles.buttonContainer2, { paddingLeft: isTiny ? 0 : 10, paddingTop: isTiny ? 0 : 50, justifyContent: todo?.openPoll === true ? 'flex-start' : 'flex-start', alignItems: todo?.openPoll === true ? 'flex-start' : 'flex-start' }]}>

        <RX.Text style={_styles.todoTitle}>
          {'Title: ' + todo?.title}
        </RX.Text>
        <RX.Text style={todo?.openPoll === true ? _styles.todoTextPoll1 : _styles.todoTextPoll2}>
          {todo?.openPoll === true ? 'Open Poll' : 'Closed'}
        </RX.Text>

        <RX.Text style={_styles.todoText3}>
          {'Owner: ' + todo?.ownerAddress}
        </RX.Text>
        {todo?.winner === '' || todo?.openPoll === true ? null : <RX.Text style={_styles.todoTextW}>
          {'winner: ' + todo?.winner === '' ? 'Tie' : 'winner: ' + todo?.winner}
        </RX.Text>}

        {todo?.winner === '' || todo?.openPoll === true ? null : <RX.Text style={_styles.todoText}>
          {todo ? 'Total Votes: ' + todo?.totalVotes : ''}
        </RX.Text>}
        <RX.Text style={_styles.todoText}>
        </RX.Text>
        <RX.View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {todo?.ownerAddress === userAddress && todo?.openPoll === true ? load ? null : <UI.Button onPress={_onPressClose} style={{ root: [{ marginBottom: 10, marginRight: isTiny ? 20 : 0, }], content: [{ backgroundColor: 'red', height: 57, width: 100, marginBottom: 5, borderRadius: 11, }], label: _styles.label2 }
          } elevation={4} variant={"outlined"} label="Close Votation" />
            : null
          }
          {!load ? lock ? todo?.openPoll !== true ? null : !isTiny ? null : <RX.Text style={_styles.todoTitleV}>
            {'Vote Done!'}
          </RX.Text> : option?.title === '' || !isTiny ? null :
            <UI.Button onPress={_onPressVote} iconSlot={iconStyle => (
              <RX.Image source={ImageSource.hand} style={{ marginTop: 0, alignSelf: 'center', marginRight: 5, width: 47, height: 47 }} />
            )} style={{ root: [{ marginLeft: 0 }], content: [{ height: isTiny ? 50 : 80, backgroundColor: 'white', width: 200, marginBottom: 5, borderRadius: 11, }], label: _styles.label }
            } elevation={4} variant={"outlined"} label="+1 Vote" />
            : todo?.ownerAddress !== userAddress ? null : <RX.View style={{ height: isTiny ? 50 : 80, }}><UI.Spinner size={'medium'} style={{ marginBottom: 5, alignSelf: 'flex-start', }} color={'white'} /></RX.View>}


        </RX.View>
        {option?.title !== '' ?
          <RX.Text style={_styles.todoHeader}>
            {todo || !lock ? 'Vote For ' + option?.title : ''}
          </RX.Text> : todo?.voted === true ? todo?.winner !== '' ? null : todo?.openPoll === false ? null : <RX.Text style={_styles.todoText4}>
            {'Cannot vote again'}
          </RX.Text> : todo?.winner !== '' ? null :
            <RX.Text style={_styles.todoHeader}>
              {'Select an Option to vote'}
            </RX.Text>}
        {option?.title !== '' || todo?.voted !== true ?
          <RX.View style={isTiny ? _styles.buttonContainer4 : _styles.buttonContainer}>


            {!load ? lock ? <RX.Text style={_styles.todoTitle2}>
              {'Vote Done!'}
            </RX.Text> : option?.title === '' || isTiny ? null :
              <UI.Button onPress={_onPressVote} iconSlot={iconStyle => (
                <RX.Image source={ImageSource.hand} style={{ marginTop: 0, alignSelf: 'center', marginRight: 5, width: 47, height: 47 }} />
              )} style={{ content: [{ height: isTiny ? 50 : 80, backgroundColor: 'white', width: 200, marginBottom: 5, borderRadius: 11, }], label: _styles.label }
              } elevation={4} variant={"outlined"} label="+1 Vote" />
              : <RX.View style={{ height: isTiny ? 50 : 80, }}> <UI.Spinner size={'medium'} style={{ height: isTiny ? 50 : 80, marginBottom: 5, alignSelf: 'flex-start', }} color={'white'} /></RX.View>}



            <RX.Text style={_styles.todoText4}>
              {alert != '' ? alert : ''}
            </RX.Text>

          </RX.View> : null}
        {isTiny ? null : <UI.Button onPress={_onPressCopy} style={{ root: [{ marginBottom: 10, marginTop: 20 }], content: [{ backgroundColor: 'orange', height: 57, width: 100, marginBottom: 5, borderRadius: 11, }], label: _styles.label3 }
        } elevation={4} variant={"outlined"} label="Copy Poll Link" />}
      </RX.View>
      {todo?.openPoll === false ? null :
        <RX.View style={[isTiny ? _styles.container3 : _styles.container2, { borderWidth: 1, borderRadius: 12, borderColor: 'white' }]}>
          <RX.Text style={_styles.todoTitle2}>
            {'Select an Option'}
          </RX.Text>
          <TodoListPanel2 selectedTodoId={option.id || ''} voted={todo?.voted} isTiny={isTiny} options={options} />

        </RX.View>

      }

      {!isTiny ? null : <UI.Button onPress={_onPressCopy} style={{ root: [{ marginBottom: 10, marginTop: 10, alignSelf: 'center' }], content: [{ backgroundColor: 'orange', height: 37, width: 150, marginBottom: 5, borderRadius: 11, }], label: _styles.label3 }
      } elevation={4} variant={"outlined"} label="Copy Poll Link" />}
    </UI.Paper>

  </RX.View >)

}


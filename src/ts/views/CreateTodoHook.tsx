
import { Colors, Fonts, FontSizes, Styles } from '../app/Styles';



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
  todoTitle3: RX.Styles.createTextStyle({
    margin: 2,
    marginBottom: 2,
    fontSize: FontSizes.size16,
    color: Colors.white,
    backgroundColor: 'transparent',
  }),
  todoTitle2: RX.Styles.createTextStyle({
    margin: 2,
    marginBottom: 2,
    fontSize: FontSizes.size20,
    color: Colors.white,
    backgroundColor: 'transparent',
  }),
  todoTitle: RX.Styles.createTextStyle({
    margin: 2,
    height: 20,
    alignSelf: 'stretch',
    fontSize: FontSizes.size14,
    color: Colors.white,
    backgroundColor: 'transparent',
  }),
  todoTitle4: RX.Styles.createTextStyle({
    margin: 2,
    alignSelf: 'stretch',
    fontSize: FontSizes.size12,
    color: Colors.white,
    backgroundColor: 'transparent',
  }),
  todoHeader: RX.Styles.createTextStyle({
    margin: 2,
    fontSize: FontSizes.size20,
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
  todoText: RX.Styles.createTextStyle({
    margin: 2,
    fontSize: FontSizes.size16,
    alignSelf: 'stretch',
    color: Colors.white,
    backgroundColor: 'transparent',
  }),
  buttonContainer: RX.Styles.createViewStyle({
    margin: 2,
    height: 150,
    width: 400,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    alignItems: 'center',
  }),
  buttonContainer2: RX.Styles.createViewStyle({
    margin: 2,
    width: 400,
    height: 550,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }),
  buttonContainer3: RX.Styles.createViewStyle({
    margin: 2,
    width: 360,
    height: 280,
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
  editTodoItem3: RX.Styles.createTextInputStyle({
    margin: 4,
    marginHorizontal: 8,
    height: 37,
    width: 240,
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
    marginVertical: 4,
    marginRight: 4,
    height: 37,
    width: 230,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    opacity: 0.5,
    backgroundColor: '#323238',
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
  })
};

import * as RX from 'reactxp';
import { useState } from 'react';
import * as UI from '@sproutch/ui';
import TodosStore from '../stores/TodosStore';
import _ = require('lodash');
import TodoListPanel2 from './TodoListPanel2';
import { Option } from '../models/TodoModels';
import CurrentUserStore from '../stores/CurrentUserStore';
import NavContextStore from '../stores/NavContextStore';

const Moralis = require('moralis');
const serverUrl = "https://qqdpez4ourk2.moralishost.com:2053/server";
const appId = "kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk";
Moralis.start({ serverUrl, appId });


export const CreateTodoHook = ({
  isLogin,
  pollOptions,
  isTiny,
}: {
  pollOptions: Option[],
  isLogin: boolean;
  isTiny: boolean;
}) => {
  const [time, setTime] = useState<any>(1)
  const [title, setTitle] = useState('')
  const [opt1, setOption] = useState('')
  const [alert, setAlert] = useState('')
  const [url,] = useState('')
  const [cargando, setCargando] = useState(false)
  async function _onPressSave2(e: RX.Types.SyntheticEvent) {
    e.stopPropagation()
    const now = Date.now().valueOf();
    setCargando(true)

    if (opt1 === '') {

      setAlert("Fill option field")
      setCargando(false)
      return
    }
    if (!pollOptions) {
      setCargando(false)
      return
    }
    let find = _.find(pollOptions, todo => todo.title === opt1)

    if (find) {
      setAlert("Can't add an existing option")
      setCargando(false)
      return
    }

    let newOpt: Option = {
      id: now.toString(),
      creationTime: now,
      title: opt1,
      url: url,
      votes: 0,
      votesPercent: '4',
      _searchTerms: ''
    }
    await TodosStore.addOption(newOpt)

    setCargando(false)
    setOption('')

    setCargando(false)
    return


  };
  const _onPressCreate = async (e: RX.Types.SyntheticEvent) => {
    e.stopPropagation()
    if (pollOptions) {

      const isMetaMaskInstalled = await Moralis.isMetaMaskInstalled();


      if (!isMetaMaskInstalled) {
        CurrentUserStore.setLogin(false)

        setAlert("Must Install Metamask First")
        setCargando(false)
        return

      }
      if (title == '') {

        setAlert("Title can't be empty")
        setCargando(false)
        return
      }
      if (pollOptions.length <= 1) {

        setAlert("Must be aleast 2 poll options")
        setCargando(false)
        return
      }


      await Moralis.enable();
      setAlert('')

      setCargando(true)
      try {
        await Moralis.Web3.authenticate().then(async (user: any) => {

          let address = user.get('ethAddress')
          const options1 = { chain: "eth", address: address, order: "desc", from_block: "0" };
          const transactions1 = await Moralis.Web3API.account.getTransactions(options1);


          const options2 = { chain: "bsc", address: address, order: "desc", from_block: "0" };
          const transactions2 = await Moralis.Web3API.account.getTransactions(options2);

          const options3 = { chain: "matic", address: address, order: "desc", from_block: "0" };
          const transactions3 = await Moralis.Web3API.account.getTransactions(options3);

          console.log('transactions1 ' + transactions1.total)
          if (transactions1.total !== 0 || transactions2.total !== 0 || transactions3.total !== 0) {


            CurrentUserStore.setLogin(true)
            setAlert('')
            CurrentUserStore.setCargando(false)
            let objectId = user.get('objectId')
            CurrentUserStore.setUser(objectId, '', address, transactions1.total, transactions2.total, transactions3.total)

            setTitle('')
            setTime(0)
            let finalOptions: Option[] = []
            const now = Date.now().valueOf();

            for (let i = 0; i < pollOptions.length; i++) {
              finalOptions.concat({
                id: now.toString(),
                creationTime: now,
                title: title,
                url: url,
                votes: 0,
                votesPercent: '0',
                _searchTerms: ''
              })
            }

            await TodosStore.setOptions(pollOptions)

            const Poll = Moralis.Object.extend("Poll")

            const now2 = Date.now().valueOf();
            const item = new Poll()
            item.set("title", title)
            item.set("winner", '')
            item.set("pollId", now2.toString())
            item.set("openPoll", true)
            item.set("duration", time)
            item.set("voted", false)
            item.set("owners", [])
            item.set("totalVotes", 0)
            item.set("ownerAddress", address)
            item.set("time", time)
            item.set("options", pollOptions)

            await item.save()



            NavContextStore.navigateToTodoList(now2.toString());


            await TodosStore.setOptions(pollOptions)

            setCargando(false)
            return


          } else {
            setAlert('Must have at least one transaction  on Ethereum, Binance Smart Chain or Polygon Network')

            setCargando(false)
            return
          }
        })


      } catch (error) {
        if (error == "Error: User closed modal") {
          setAlert('"You have closed modal"')

          setCargando(false)
          return
        } else {

          setAlert(error.message)

          setCargando(false)
          return
        }
      }
    }
  };

  return (<RX.View style={[_styles.container, Styles.statusBarTopMargin, {}]}>

    <UI.Paper elevation={10} style={{ root: { marginBottom: isTiny ? 50 : 0, flexDirection: isTiny ? 'column' : 'row', justifyContent: isTiny ? 'center' : 'center', borderRadius: 12, backgroundColor: '#323238', width: isTiny ? 370 : 700, height: isTiny ? 600 : 500, } }} >

      <RX.View style={isTiny ? _styles.buttonContainer3 : _styles.buttonContainer2}>
        {isTiny ? <RX.View style={{ height: 30 }} />

          :
          <RX.Text style={[_styles.todoTitle2, { marginBottom: 5 }]}>
            {'Create new Poll'}
          </RX.Text>}
        <RX.Text style={_styles.todoTitle}>
          {'Title'}
        </RX.Text>
        <RX.TextInput
          maxLength={80}
          style={_styles.editTodoItem}
          value={title}
          placeholder={'Enter Title'}
          onChangeText={setTitle}
          accessibilityId={'EditTodoPanelTextInput'}
        />
        <RX.View style={{ height: 80, width: isTiny ? 320 : 380, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <RX.Text style={[_styles.todoTitle, { marginTop: 10 }]}>
            {'Add Poll Option'}
          </RX.Text>
          <RX.View style={{ marginHorizontal: isTiny ? 0 : 10, marginVertical: 10, flexDirection: 'row', width: isTiny ? 320 : 380, height: 50, justifyContent: 'flex-start', alignItems: 'center' }}>
            <RX.TextInput

              maxLength={120}
              style={[isTiny ? _styles.editTodoItem2 : _styles.editTodoItem3, { marginHorizontal: isTiny ? 0 : 10, marginVertical: 10, }]}
              value={opt1}
              placeholder={'Enter a participant'}
              onChangeText={setOption}
              accessibilityId={'EditTodoPanelTextInput'}
            />  {!cargando ?
              <UI.Button onPress={(e) => _onPressSave2(e)} style={{ root: [{ marginLeft: 10, marginRight: 35 }], content: [{ height: 37, backgroundColor: 'white', width: 60, marginBottom: 5, borderRadius: 11, }], label: _styles.label }
              } elevation={4} variant={"outlined"} label="ADD" />
              : null

            }
          </RX.View>

        </RX.View>
        <RX.View style={[_styles.buttonContainer]}>

          <RX.Text style={[_styles.todoTitle, { marginBottom: 10, marginTop: 10, alignSelf: isTiny ? 'center' : 'flex-start' }]}>
            {'Ready?'}
          </RX.Text>
          {!cargando ?
            <UI.Button onPress={_onPressCreate} style={{ root: { alignSelf: isTiny ? 'center' : 'flex-start' }, content: [{ height: 47, backgroundColor: 'white', width: 160, marginBottom: 5, borderRadius: 11, }], label: _styles.label }
            } elevation={4} variant={"outlined"} label="Create" />
            : <UI.Spinner size={'medium'} style={{ marginBottom: 5, alignSelf: 'flex-start', }} color={'white'} />}
          <RX.Text style={[isTiny ? _styles.todoTitle4 : _styles.todoTitle, { height: 67, alignSelf: 'center', color: 'yellow' }]}>
            {alert}
          </RX.Text>
        </RX.View>

      </RX.View>
      <RX.View style={[isTiny ? _styles.container3 : _styles.container2, { borderWidth: 1, borderRadius: 12, borderColor: 'white' }]}>
        <RX.Text style={isTiny ? _styles.todoTitle3 : _styles.todoTitle2}>
          {'Options'}
        </RX.Text>
        <TodoListPanel2 voted={true} isTiny={isTiny} options={pollOptions} />
      </RX.View>
    </UI.Paper >
  </RX.View >)

}

